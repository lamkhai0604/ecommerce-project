package com.commerceflow.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.CodePointLength;

public record RegisterRequest(
        @NotBlank @Email @Size(max = 320) String email,
        @NotBlank @CodePointLength(min = 12, max = 128) String password,
        @NotBlank @CodePointLength(min = 1, max = 150) String fullName) {
    public RegisterRequest {
        if (email != null) email = AuthService.normalizeEmail(email);
    }

    @Override public String toString() { return "RegisterRequest[REDACTED]"; }
}
