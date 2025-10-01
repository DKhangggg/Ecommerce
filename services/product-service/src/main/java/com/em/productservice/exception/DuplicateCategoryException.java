package com.em.productservice.exception;

import com.em.common.exception.DuplicateResourceException;

public class DuplicateCategoryException extends DuplicateResourceException {
    public DuplicateCategoryException(String message) {
        super(message);
    }
}
