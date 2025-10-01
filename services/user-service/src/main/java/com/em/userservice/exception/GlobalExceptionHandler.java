package com.em.userservice.exception;

import com.em.userservice.dto.response.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNameNotFound.class)
    public ResponseEntity<ErrorResponse> handleUserNameNotFound(UserNameNotFound ex) {
        return new ResponseEntity<>(
                new ErrorResponse("User Not Found", ex.getMessage(), 404, java.time.LocalDateTime.now()),
                org.springframework.http.HttpStatus.NOT_FOUND
        );
    }
    @ExceptionHandler(UsernameAlreadyExists.class)
    public ResponseEntity<ErrorResponse> handleUsernameAlreadyExists(UsernameAlreadyExists ex) {
        return new ResponseEntity<>(
                new ErrorResponse("Username Already Exists", ex.getMessage(), 409, java.time.LocalDateTime.now()),
                org.springframework.http.HttpStatus.CONFLICT
        );
    }
}
