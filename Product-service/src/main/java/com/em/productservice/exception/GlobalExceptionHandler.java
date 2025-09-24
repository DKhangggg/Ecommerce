package com.em.productservice.exception;

import com.em.productservice.dto.response.ApiResponse;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Validation errors từ @Valid
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

    // Product not found
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleProductNotFoundException(ProductNotFoundException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound("Product not found: " + ex.getMessage()));
    }

    // Duplicate product
    @ExceptionHandler(DuplicateProductException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateProductException(DuplicateProductException ex) {
        return ResponseEntity.status(409).body(ApiResponse.<Object>builder()
                .status(409)
                .message("Duplicate product: " + ex.getMessage())
                .timestamp(java.time.LocalDateTime.now())
                .build());
    }

    // Invalid product data
    @ExceptionHandler(InvalidProductDataException.class)
    public ResponseEntity<ApiResponse<Object>> handleInvalidProductDataException(InvalidProductDataException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid product data: " + ex.getMessage()));
    }

    // Insufficient stock
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ApiResponse<Object>> handleInsufficientStockException(InsufficientStockException ex) {
        return ResponseEntity.status(400).body(ApiResponse.badRequest("Insufficient stock: " + ex.getMessage()));
    }

    // Category not found
    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleCategoryNotFoundException(CategoryNotFoundException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound("Category not found: " + ex.getMessage()));
    }

    // Duplicate category
    @ExceptionHandler(DuplicateCategoryException.class)
    public ResponseEntity<ApiResponse<Object>> handleDuplicateCategoryException(DuplicateCategoryException ex) {
        return ResponseEntity.status(409).body(ApiResponse.<Object>builder()
                .status(409)
                .message("Duplicate category: " + ex.getMessage())
                .timestamp(java.time.LocalDateTime.now())
                .build());
    }

    // NoSuchElementException - khi Optional.get() fail
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<ApiResponse<Object>> handleNoSuchElementException(NoSuchElementException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound("Resource not found"));
    }

    // Data integrity violation - database constraint errors
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<Object>> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        return ResponseEntity.status(409).body(ApiResponse.<Object>builder()
                .status(409)
                .message("Data integrity violation: Duplicate or invalid data")
                .timestamp(java.time.LocalDateTime.now())
                .build());
    }

    // Method argument type mismatch - khi truyền sai kiểu dữ liệu
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiResponse<Object>> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.badRequest("Invalid parameter type: " + ex.getName()));
    }

    // IllegalArgumentException
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
