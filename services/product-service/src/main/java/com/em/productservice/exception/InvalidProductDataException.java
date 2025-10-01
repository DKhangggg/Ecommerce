package com.em.productservice.exception;

import com.em.common.exception.InvalidRequestException;

public class InvalidProductDataException extends InvalidRequestException {
    public InvalidProductDataException(String message) {
        super(message);
    }

    public InvalidProductDataException(String message, Throwable cause) {
        super(message, cause);
    }
}
