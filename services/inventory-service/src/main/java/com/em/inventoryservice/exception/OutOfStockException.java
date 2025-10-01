package com.em.inventoryservice.exception;

import com.em.common.exception.InsufficientResourceException;

public class OutOfStockException extends InsufficientResourceException {
    public OutOfStockException(String message) {
        super(message);
    }
}
