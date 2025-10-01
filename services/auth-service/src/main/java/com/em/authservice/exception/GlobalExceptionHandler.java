package com.em.authservice.exception;

import com.em.common.exception.handler.BaseExceptionHandler;
import com.em.common.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Auth Service specific exception handler
 * Extends BaseExceptionHandler for common exception handling
 * Only add auth-service specific exceptions here (Spring Security exceptions)
 */
@RestControllerAdvice
public class GlobalExceptionHandler extends BaseExceptionHandler {

    // Spring Security specific exceptions
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(404).body(ApiResponse.notFound("User not found"));
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ApiResponse<Object>> handleDisabledException(DisabledException ex) {
        return ResponseEntity.status(403).body(ApiResponse.forbidden("User account is disabled"));
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ApiResponse<Object>> handleLockedException(LockedException ex) {
        return ResponseEntity.status(423).body(ApiResponse.error(423).message("User account is locked").build());
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiResponse<Object>> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(401).body(ApiResponse.unauthorized("Invalid username or password"));
    }
}
