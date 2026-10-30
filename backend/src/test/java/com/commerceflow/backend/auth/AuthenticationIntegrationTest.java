package com.commerceflow.backend.auth;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.CookieManager;
import java.net.CookiePolicy;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@Testcontainers
@Import(AuthenticationIntegrationTest.ProbeConfiguration.class)
@org.junit.jupiter.api.extension.ExtendWith(org.springframework.boot.test.system.OutputCaptureExtension.class)
class AuthenticationIntegrationTest {
    // Unlike the local foundation suite, authentication tests fail if Docker is unavailable.
    @Container
    static final PostgreSQLContainer<?> POSTGRES = new PostgreSQLContainer<>("postgres:17");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("server.servlet.session.cookie.secure", () -> false);
    }

    @LocalServerPort int port;
    @Autowired ObjectMapper mapper;
    @Autowired JdbcTemplate jdbc;
    @Autowired PasswordEncoder passwords;

    static final String PASSWORD = "test-only-password-123";

    final class Browser {
        final CookieManager cookies = new CookieManager(null, CookiePolicy.ACCEPT_ALL);
        final HttpClient client = HttpClient.newBuilder().cookieHandler(cookies).build();
        String token;

        HttpResponse<String> send(String method, String path, Object body, String csrf) throws Exception {
            var builder = HttpRequest.newBuilder(URI.create("http://localhost:" + port + path));
            if (csrf != null) builder.header("X-CSRF-TOKEN", csrf);
            if (body != null) builder.header("Content-Type", "application/json");
            builder.method(method, body == null ? HttpRequest.BodyPublishers.noBody()
                    : HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(body)));
            return client.send(builder.build(), HttpResponse.BodyHandlers.ofString());
        }

        HttpResponse<String> get(String path) throws Exception { return send("GET", path, null, null); }
        HttpResponse<String> post(String path, Object body) throws Exception { return send("POST", path, body, token); }
        void bootstrap() throws Exception {
            var response = get("/api/v1/auth/csrf");
            assertThat(response.statusCode()).isEqualTo(200);
            assertThat(json(response).get("headerName").asText()).isEqualTo("X-CSRF-TOKEN");
            token = json(response).get("token").asText();
            assertThat(token).isNotBlank();
        }
        String cookie() {
            return cookies.getCookieStore().getCookies().stream().filter(c -> c.getName().equals("SESSION"))
                    .findFirst().orElseThrow().getValue();
        }
    }

    String email() { return UUID.randomUUID() + "@example.com"; }
    Map<String, String> registration(String email) { return Map.of("email", email, "password", PASSWORD, "fullName", "Test Customer"); }
    JsonNode json(HttpResponse<String> response) throws Exception { return mapper.readTree(response.body()); }
    Browser registered(String email) throws Exception {
        var browser = new Browser(); browser.bootstrap();
        assertThat(browser.post("/api/v1/auth/register", registration(email)).statusCode()).isEqualTo(201);
        return browser;
    }
    void login(Browser browser, String email) throws Exception {
        var response = browser.post("/api/v1/auth/login", Map.of("email", email, "password", PASSWORD));
        assertThat(response.statusCode()).as(response.body()).isEqualTo(200);
    }
    void problem(HttpResponse<String> response, int status) throws Exception {
        assertThat(response.statusCode()).as(response.body()).isEqualTo(status);
        assertThat(response.headers().firstValue("Content-Type").orElseThrow()).startsWith("application/problem+json");
        assertThat(json(response).get("status").asInt()).isEqualTo(status);
        assertThat(json(response).get("title").asText()).isNotBlank();
        assertThat(json(response).get("type").asText()).isEqualTo("about:blank");
        assertThat(response.body()).doesNotContain(PASSWORD, "passwordHash", "stackTrace", "org.springframework");
    }

    @Test
    void registrationNormalizesEmailHashesPasswordAndAssignsCustomerOnly() throws Exception {
        String email = email();
        var browser = new Browser(); browser.bootstrap();
        var response = browser.post("/api/v1/auth/register", registration("  " + email.toUpperCase() + "  "));
        assertThat(response.statusCode()).isEqualTo(201);
        assertThat(json(response).get("email").asText()).isEqualTo(email);
        assertThat(json(response).get("fullName").asText()).isEqualTo("Test Customer");
        assertThat(json(response).get("roles").toString()).isEqualTo("[\"CUSTOMER\"]");
        assertThat(json(response).size()).isEqualTo(4);
        UUID.fromString(json(response).get("id").asText());
        var hash = jdbc.queryForObject("SELECT password_hash FROM commerceflow.users WHERE email = ?", String.class, email);
        assertThat(hash).isNotEqualTo(PASSWORD);
        assertThat(passwords.matches(PASSWORD, hash)).isTrue();
        problem(browser.get("/api/v1/auth/me"), 401); // registration does not silently log in
        problem(browser.post("/api/v1/auth/register", registration(email.toUpperCase())), 409);
    }

    @Test
    void invalidRegistrationAndPrivilegeInjectionAreRejectedSafely() throws Exception {
        var browser = new Browser(); browser.bootstrap();
        for (var body : new Object[] {
                Map.of("email", "invalid", "password", "short", "fullName", ""),
                Map.of("email", email(), "password", PASSWORD, "fullName", "Test", "roles", new String[]{"ADMIN"}),
                Map.of("email", email(), "password", "x".repeat(129), "fullName", "Test"),
                Map.of("email", email(), "password", 1234567890123456L, "fullName", "Test"),
                Map.of("email", email(), "password", PASSWORD, "fullName", 123),
                Map.of("email", email(), "password", PASSWORD, "fullName", "x".repeat(151)),
                Map.of("email", email(), "password", PASSWORD)}) {
            problem(browser.post("/api/v1/auth/register", body), 400);
        }
        var invalid = browser.post("/api/v1/auth/register", Map.of("email", "invalid", "password", "short", "fullName", ""));
        assertThat(json(invalid).get("errors").has("password")).isTrue();
        assertThat(invalid.body()).doesNotContain("short");
    }

    @Test
    void missingInvalidAndCrossSessionCsrfAreRejectedForAllAuthWrites() throws Exception {
        var browser = new Browser(); browser.bootstrap();
        var other = new Browser(); other.bootstrap();
        for (String path : new String[]{"/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/auth/logout"}) {
            problem(browser.send("POST", path, registration(email()), null), 403);
            problem(browser.send("POST", path, registration(email()), "invalid"), 403);
            problem(browser.send("POST", path, registration(email()), other.token), 403);
        }
    }

    @Test
    void loginRotatesSessionRefreshesCsrfAndPersistsAuthenticationInPostgres() throws Exception {
        String email = email(); var browser = registered(email);
        String oldCookie = browser.cookie(); String oldToken = browser.token;
        login(browser, email.toUpperCase());
        String newCookie = browser.cookie();
        assertThat(newCookie).isNotEqualTo(oldCookie);
        var me = browser.get("/api/v1/auth/me");
        assertThat(me.statusCode()).isEqualTo(200);
        assertThat(json(me).get("email").asText()).isEqualTo(email);
        assertThat(jdbc.queryForObject("SELECT count(*) FROM commerceflow.spring_session WHERE principal_name = ?", Integer.class, email)).isEqualTo(1);
        assertThat(jdbc.queryForObject("SELECT count(*) FROM commerceflow.spring_session_attributes WHERE attribute_name = 'SPRING_SECURITY_CONTEXT'", Integer.class)).isPositive();
        var serialized = jdbc.queryForObject("""
                SELECT a.attribute_bytes FROM commerceflow.spring_session_attributes a
                JOIN commerceflow.spring_session s ON s.primary_id = a.session_primary_id
                WHERE s.principal_name = ? AND a.attribute_name = 'SPRING_SECURITY_CONTEXT'
                """, byte[].class, email);
        var hash = jdbc.queryForObject("SELECT password_hash FROM commerceflow.users WHERE email = ?", String.class, email);
        assertThat(new String(serialized, java.nio.charset.StandardCharsets.ISO_8859_1)).doesNotContain(PASSWORD, hash);
        var old = HttpClient.newHttpClient().send(HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/v1/auth/me"))
                .header("Cookie", "SESSION=" + oldCookie).GET().build(), HttpResponse.BodyHandlers.ofString());
        problem(old, 401);
        problem(browser.send("POST", "/api/v1/auth/logout", null, oldToken), 403);
        browser.bootstrap(); assertThat(browser.token).isNotEqualTo(oldToken);
        assertThat(browser.get("/api/v1/auth/me").headers().firstValue("Cache-Control").orElseThrow()).contains("no-store");
    }

    @Test
    void failedLoginDoesNotAuthenticateOrDiscloseAccountExistence() throws Exception {
        String email = email(); var browser = registered(email);
        var wrong = browser.post("/api/v1/auth/login", Map.of("email", email, "password", "wrong-test-password"));
        var missing = browser.post("/api/v1/auth/login", Map.of("email", email(), "password", "wrong-test-password"));
        problem(wrong, 401); problem(missing, 401);
        assertThat(wrong.body()).isEqualTo(missing.body());
        problem(browser.get("/api/v1/auth/me"), 401);
    }

    @Test
    void logoutDeletesJdbcSessionExpiresCookieAndPreventsReplay() throws Exception {
        String email = email(); var browser = registered(email); login(browser, email); browser.bootstrap();
        String authenticatedCookie = browser.cookie();
        var logout = browser.post("/api/v1/auth/logout", null);
        assertThat(logout.statusCode()).isEqualTo(204);
        assertThat(logout.body()).isEmpty();
        assertThat(logout.headers().allValues("Set-Cookie")).anySatisfy(cookie -> assertThat(cookie).contains("SESSION=", "Max-Age=0"));
        assertThat(jdbc.queryForObject("SELECT count(*) FROM commerceflow.spring_session WHERE principal_name = ?", Integer.class, email)).isZero();
        var replay = HttpClient.newHttpClient().send(HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/v1/auth/me"))
                .header("Cookie", "SESSION=" + authenticatedCookie).GET().build(), HttpResponse.BodyHandlers.ofString());
        problem(replay, 401);
        browser.bootstrap(); problem(browser.post("/api/v1/auth/logout", null), 401);
    }

    @Test
    void customerAndAdminAuthorizationAreEnforcedByRealSessions() throws Exception {
        var anonymous = new Browser();
        problem(anonymous.get("/api/v1/admin/probe"), 401);
        problem(anonymous.get("/api/v1/account/probe"), 401);
        String customer = email(); var browser = registered(customer); login(browser, customer);
        problem(browser.get("/api/v1/admin/probe"), 403);
        assertThat(browser.get("/api/v1/account/probe").statusCode()).isEqualTo(200);
        String admin = email(); var adminBrowser = registered(admin);
        jdbc.update("INSERT INTO commerceflow.user_roles (user_id, role_id) SELECT id, 2 FROM commerceflow.users WHERE email = ?", admin);
        login(adminBrowser, admin);
        assertThat(adminBrowser.get("/api/v1/admin/probe").statusCode()).isEqualTo(200);
    }

    @Test
    void disabledAccountsCannotLogin() throws Exception {
        String email = email(); var browser = registered(email);
        jdbc.update("UPDATE commerceflow.users SET account_status = 'DISABLED' WHERE email = ?", email);
        problem(browser.post("/api/v1/auth/login", Map.of("email", email, "password", PASSWORD)), 401);
        problem(browser.get("/api/v1/auth/me"), 401);
    }

    @Test
    void concurrentNormalizedRegistrationsCannotCreateDuplicates(org.springframework.boot.test.system.CapturedOutput output) throws Exception {
        String email = email(); var first = new Browser(); first.bootstrap(); var second = new Browser(); second.bootstrap();
        var ready = new CountDownLatch(1);
        try (var pool = Executors.newFixedThreadPool(2)) {
            var a = pool.submit(() -> { ready.await(); return first.post("/api/v1/auth/register", registration(email)).statusCode(); });
            var b = pool.submit(() -> { ready.await(); return second.post("/api/v1/auth/register", registration(email.toUpperCase())).statusCode(); });
            ready.countDown(); assertThat(java.util.List.of(a.get(), b.get())).containsExactlyInAnyOrder(201, 409);
        }
        assertThat(jdbc.queryForObject("SELECT count(*) FROM commerceflow.users WHERE email = ?", Integer.class, email)).isEqualTo(1);
        assertThat(output.getAll()).doesNotContain(email, email.toUpperCase(), PASSWORD);
    }

    @Test
    void cookieFlagsAndBodyFreeHealthRemainCorrect() throws Exception {
        var browser = new Browser(); var response = browser.get("/api/v1/auth/csrf");
        assertThat(response.headers().allValues("Set-Cookie")).anySatisfy(cookie -> assertThat(cookie).contains("HttpOnly", "SameSite=Lax", "Path=/"));
        assertThat(browser.get("/api/v1/health").statusCode()).isEqualTo(200);
        assertThat(browser.get("/actuator/health").statusCode()).isEqualTo(200);
    }

    @Test
    void expiredJdbcSessionCannotAccessAuthenticatedEndpoints() throws Exception {
        String email = email(); var browser = registered(email); login(browser, email);
        jdbc.update("UPDATE commerceflow.spring_session SET last_access_time = 0, expiry_time = 0 WHERE principal_name = ?", email);
        problem(browser.get("/api/v1/auth/me"), 401);
    }

    @Test
    void csrfProtectionAlsoCoversPutPatchAndDelete() throws Exception {
        String email = email(); var browser = registered(email); login(browser, email);
        for (String method : new String[]{"PUT", "PATCH", "DELETE"}) {
            problem(browser.send(method, "/api/v1/account/probe", Map.of(), null), 403);
        }
    }

    @Test
    void csrfQueryParameterCannotReplaceRequiredHeader() throws Exception {
        var browser = new Browser(); browser.bootstrap();
        String token = java.net.URLEncoder.encode(browser.token, java.nio.charset.StandardCharsets.UTF_8);
        problem(browser.send("POST", "/api/v1/auth/register?_csrf=" + token, registration(email()), null), 403);
    }

    @Test
    void submittedPasswordsAreNotWrittenToLogs(org.springframework.boot.test.system.CapturedOutput output) throws Exception {
        var browser = new Browser(); browser.bootstrap();
        String secret = "log-check-" + UUID.randomUUID();
        var response = browser.post("/api/v1/auth/register", Map.of("email", email(), "password", secret, "fullName", "Log Test"));
        assertThat(response.statusCode()).isEqualTo(201);
        assertThat(output.getAll()).doesNotContain(secret);
        assertThat(response.body()).doesNotContain(secret);
    }

    @Test
    void unicodeLengthsFollowOpenApiCharacterLimitsWithoutPasswordTruncation() throws Exception {
        String email = email(); var browser = new Browser(); browser.bootstrap();
        String password = "🔐".repeat(128);
        var registration = browser.post("/api/v1/auth/register", Map.of(
                "email", email, "password", password, "fullName", "😀".repeat(150)));
        assertThat(registration.statusCode()).as(registration.body()).isEqualTo(201);
        assertThat(browser.post("/api/v1/auth/login", Map.of("email", email, "password", password)).statusCode()).isEqualTo(200);
    }

    @TestConfiguration
    static class ProbeConfiguration {
        @Bean RoleProbe roleProbe() { return new RoleProbe(); }
    }
    // Test-only endpoints exercise role matchers without implementing deferred admin/catalog APIs.
    @RestController
    static class RoleProbe {
        @GetMapping("/api/v1/admin/probe") String admin() { return "ok"; }
        @GetMapping("/api/v1/account/probe") String customer() { return "ok"; }
    }
}
