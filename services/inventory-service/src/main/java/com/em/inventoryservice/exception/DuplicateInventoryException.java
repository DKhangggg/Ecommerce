package com.em.inventoryservice.exception;

import com.em.common.exception.DuplicateResourceException;

public class DuplicateInventoryException extends DuplicateResourceException {
    public DuplicateInventoryException(String message) {
        super(message);
    }
}
