package com.em.common.exception;

/**
 * Base exception for resources not found
 * Services should extend this for specific resource types
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}

