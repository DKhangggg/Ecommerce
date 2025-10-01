package com.em.userservice.exception;

public class UserNameNotFound extends RuntimeException {
    public UserNameNotFound(String message) {
        super(message);
    }

    public UserNameNotFound(String message, Throwable cause) {
        super(message, cause);
    }
}
