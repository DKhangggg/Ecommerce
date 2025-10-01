package com.em.common.exception;

/**
 * Base exception for business logic errors
 * Services should extend this for specific business rule violations
 */
public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }

    public BusinessException(String message, Throwable cause) {
        super(message, cause);
    }
}

