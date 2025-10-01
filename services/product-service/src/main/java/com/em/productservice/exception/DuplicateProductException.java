package com.em.productservice.exception;

import com.em.common.exception.DuplicateResourceException;

public class DuplicateProductException extends DuplicateResourceException {
    public DuplicateProductException(String message) {
        super(message);
    }

    public DuplicateProductException(String message, Throwable cause) {
        super(message, cause);
    }
}
