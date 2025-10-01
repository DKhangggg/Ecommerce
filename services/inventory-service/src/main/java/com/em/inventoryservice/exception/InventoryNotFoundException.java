package com.em.inventoryservice.exception;

import com.em.common.exception.ResourceNotFoundException;

public class InventoryNotFoundException extends ResourceNotFoundException {
    public InventoryNotFoundException(String message) {
        super(message);
    }
}
