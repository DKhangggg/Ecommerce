package com.em.inventoryservice.exception;

import com.em.common.dto.response.ApiResponse;
import com.em.common.exception.handler.BaseExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Inventory Service specific exception handler
 * Extends BaseExceptionHandler for common exception handling
 * Only add inventory-service specific exceptions here
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends BaseExceptionHandler {

    // InventoryTransactionException - specific to inventory operations
    @ExceptionHandler(InventoryTransactionException.class)
    public ResponseEntity<ApiResponse<Object>> handleInventoryTransactionException(InventoryTransactionException ex) {
        return ResponseEntity.status(500).body(ApiResponse.internalServerError("Transaction failed: " + ex.getMessage()));
    }
}
