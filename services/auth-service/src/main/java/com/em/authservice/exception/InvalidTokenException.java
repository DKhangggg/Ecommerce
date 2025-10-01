package com.em.authservice.exception;

import com.em.common.exception.InvalidRequestException;

public class InvalidTokenException extends InvalidRequestException {
    public InvalidTokenException(String message) {
        super(message);
    }
}
