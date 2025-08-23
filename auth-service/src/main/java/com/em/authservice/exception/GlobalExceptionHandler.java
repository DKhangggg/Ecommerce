package com.em.authservice.exception;

import com.em.authservice.dto.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("Validation failed")
                .Status(400)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.badRequest().body(response);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("User not found")
                .Status(404)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(404).body(response);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {
        ApiResponse<Object> response = ApiResponse.builder()
                .Status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("Internal server error: " + ex.getMessage())
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    @ExceptionHandler(DuplicateAccountException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateAccountException(DuplicateAccountException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("Duplicate account found: " + ex.getMessage())
                .Status(409)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }
    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ApiResponse<Object>> handleTokenExpiredException(TokenExpiredException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("Token expired: " + ex.getMessage())
                .Status(401)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidTokenException(InvalidTokenException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("Invalid token: " + ex.getMessage())
                .Status(401)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidRequestException(InvalidRequestException ex) {
        ApiResponse<Object> response = ApiResponse.<Object>builder()
                .message("Invalid request: " + ex.getMessage())
                .Status(400)
                .data(null)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.badRequest().body(response);
    }

}
