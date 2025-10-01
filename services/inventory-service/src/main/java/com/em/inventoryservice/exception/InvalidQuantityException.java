package com.em.inventoryservice.exception;

import com.em.common.exception.InvalidRequestException;

public class InvalidQuantityException extends InvalidRequestException {
    public InvalidQuantityException(String message) {
        super(message);
    }
}
