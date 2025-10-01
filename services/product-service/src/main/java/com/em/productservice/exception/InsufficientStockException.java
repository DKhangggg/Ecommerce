package com.em.productservice.exception;

import com.em.common.exception.InsufficientResourceException;

public class InsufficientStockException extends InsufficientResourceException {
    public InsufficientStockException(String message) {
        super(message);
    }

    public InsufficientStockException(String message, Throwable cause) {
        super(message, cause);
    }
}
