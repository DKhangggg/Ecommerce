package com.em.inventoryservice.exception;

import com.em.common.exception.InsufficientResourceException;

public class InsufficientStockException extends InsufficientResourceException {
    public InsufficientStockException(String message) {
        super(message);
    }
}
