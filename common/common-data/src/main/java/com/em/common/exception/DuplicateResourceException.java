package com.em.common.exception;

/**
 * Base exception for duplicate resources
 * Services should extend this for specific resource types
 */
public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }

    public DuplicateResourceException(String message, Throwable cause) {
        super(message, cause);
    }
}

