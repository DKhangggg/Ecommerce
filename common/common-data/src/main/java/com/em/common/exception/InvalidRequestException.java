package com.em.common.exception;

/**
 * Base exception for invalid requests
 * Services should extend this for specific validation errors
 */
public class InvalidRequestException extends RuntimeException {
    public InvalidRequestException(String message) {
        super(message);
    }

    public InvalidRequestException(String message, Throwable cause) {
        super(message, cause);
    }
}

