package com.commerceflow.backend.auth;

import jakarta.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.MediaType;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class AuthExceptionHandler {
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(AuthExceptionHandler.class);

    @ExceptionHandler({AuthService.EmailConflictException.class, DataIntegrityViolationException.class})
    ResponseEntity<ProblemDetail> conflict(Exception ignored, HttpServletRequest request) {
        LOG.info("Registration rejected: email conflict");
        return response(409, "EMAIL_CONFLICT", "An account with this email already exists", request);
    }

    @ExceptionHandler(AuthenticationException.class)
    ResponseEntity<ProblemDetail> authentication(AuthenticationException ignored, HttpServletRequest request) {
        LOG.info("Authentication rejected");
        return response(401, "INVALID_CREDENTIALS", "Invalid email or password", request);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ProblemDetail> validation(MethodArgumentNotValidException exception, HttpServletRequest request) {
        var problem = ApiErrors.problem(400, "VALIDATION_ERROR", "Request validation failed", request);
        var errors = new LinkedHashMap<String, String>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
                errors.putIfAbsent(error.getField(), error.getDefaultMessage()));
        problem.setProperty("errors", errors);
        return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_PROBLEM_JSON).body(problem);
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    ResponseEntity<ProblemDetail> malformed(HttpMessageNotReadableException ignored, HttpServletRequest request) {
        return response(400, "INVALID_REQUEST", "Request body is invalid", request);
    }

    private ResponseEntity<ProblemDetail> response(int status, String code, String detail, HttpServletRequest request) {
        return ResponseEntity.status(status).contentType(MediaType.APPLICATION_PROBLEM_JSON)
                .body(ApiErrors.problem(status, code, detail, request));
    }
}
