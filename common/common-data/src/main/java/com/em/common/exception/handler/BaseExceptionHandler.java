package com.em.common.exception.handler;

import com.em.common.dto.response.ApiResponse;
import com.em.common.exception.*;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;

/**
 * Base Global Exception Handler
 * Services can extend this class and add their own specific handlers
 */
@RestControllerAdvice
public class BaseExceptionHandler {

    // Validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Object>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.add(error.getField() + ": " + error.getDefaultMessage())
        );
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                errors.add(error.getObjectName() + ": " + error.getDefaultMessage())
        );

        String errorMessage = errors.isEmpty() ? "Validation failed" : String.join(", ", errors);
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Validation failed: " + errorMessage));
    }

    // Constraint violation
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleConstraintViolationException(ConstraintViolationException ex) {
        List<String> errors = new ArrayList<>();
        ex.getConstraintViolations().forEach(violation ->
                errors.add(violation.getPropertyPath() + ": " + violation.getMessage())
        );
        String errorMessage = errors.isEmpty() ? "Validation failed" : String.join(", ", errors);
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Validation failed: " + errorMessage));
    }

    // Resource not found
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound(ex.getMessage()));
    }

    // Duplicate resource
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateResourceException(DuplicateResourceException ex) {
        return ResponseEntity.status(409).body(ApiResponse.conflict(ex.getMessage()));
    }

    // Invalid request
    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidRequestException(InvalidRequestException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.badRequest(ex.getMessage()));
    }

    // Business exception
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiResponse<Object>> handleBusinessException(BusinessException ex) {
        return ResponseEntity.status(400).body(ApiResponse.badRequest(ex.getMessage()));
    }

    // Insufficient resource
    @ExceptionHandler(InsufficientResourceException.class)
    public ResponseEntity<ApiResponse<Object>> handleInsufficientResourceException(InsufficientResourceException ex) {
        return ResponseEntity.status(400).body(ApiResponse.badRequest(ex.getMessage()));
    }

    // Authentication exception
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ApiResponse<Object>> handleAuthenticationException(AuthenticationException ex) {
        return ResponseEntity.status(401).body(ApiResponse.unauthorized(ex.getMessage()));
    }

    // Method argument type mismatch
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid parameter type: " + ex.getName()));
    }

    // Illegal argument
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid argument: " + ex.getMessage()));
    }

    // Runtime exceptions
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiResponse<Object>> handleRuntimeException(RuntimeException ex) {
        return ResponseEntity.status(500).body(ApiResponse.internalServerError("Runtime error: " + ex.getMessage()));
    }

    // Generic exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGenericException(Exception ex) {
        return ResponseEntity.status(500).body(ApiResponse.internalServerError("Internal server error: " + ex.getMessage()));
    }
}

