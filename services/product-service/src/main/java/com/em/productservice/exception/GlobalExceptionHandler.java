package com.em.productservice.exception;

import com.em.common.dto.response.ApiResponse;
import com.em.common.exception.handler.BaseExceptionHandler;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

/**
 * Product Service specific exception handler
 * Extends BaseExceptionHandler for common exception handling
 * Only add product-service specific exceptions here
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends BaseExceptionHandler {

    // NoSuchElementException - khi Optional.get() fail
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiResponse<Object>> handleNoSuchElementException(NoSuchElementException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound("Resource not found"));
    }

    // Data integrity violation - database constraint errors
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return ResponseEntity.status(409).body(ApiResponse.conflict("Data integrity violation: Duplicate or invalid data"));
    }
}
