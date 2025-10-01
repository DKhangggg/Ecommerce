package com.em.common.exception;

/**
 * Base exception for authentication/authorization errors
 * Services should extend this for specific auth failures
 */
public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message) {
        super(message);
    }

    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

