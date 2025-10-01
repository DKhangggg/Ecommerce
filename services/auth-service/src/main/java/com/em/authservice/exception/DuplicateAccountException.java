package com.em.authservice.exception;

import com.em.common.exception.DuplicateResourceException;

public class DuplicateAccountException extends DuplicateResourceException {
    public DuplicateAccountException(String message) {
        super(message);
    }
}
