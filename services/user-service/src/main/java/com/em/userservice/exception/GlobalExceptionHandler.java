package com.em.userservice.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNameNotFound.class)
    public ResponseEntity<Map<String, Object>> handleUserNameNotFound(UserNameNotFound ex) {
        Map<String, Object> body = Map.of(
                "error", "User Not Found",
                "message", ex.getMessage(),
                "status", 404,
                "timestamp", java.time.LocalDateTime.now().toString()
        );
        return new ResponseEntity<>(body, org.springframework.http.HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UsernameAlreadyExists.class)
    public ResponseEntity<Map<String, Object>> handleUsernameAlreadyExists(UsernameAlreadyExists ex) {
        Map<String, Object> body = Map.of(
                "error", "Username Already Exists",
                "message", ex.getMessage(),
                "status", 409,
                "timestamp", java.time.LocalDateTime.now().toString()
        );
        return new ResponseEntity<>(body, org.springframework.http.HttpStatus.CONFLICT);
    }
}
