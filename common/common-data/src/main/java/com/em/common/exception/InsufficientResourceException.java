package com.em.common.exception;

/**
 * Base exception for insufficient resources (e.g., stock, quota)
 * Services should extend this for specific resource constraints
 */
public class InsufficientResourceException extends RuntimeException {
    public InsufficientResourceException(String message) {
        super(message);
    }

    public InsufficientResourceException(String message, Throwable cause) {
        super(message, cause);
    }
}

