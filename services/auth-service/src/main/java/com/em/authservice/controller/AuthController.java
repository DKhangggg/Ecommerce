package com.em.authservice.controller;

import com.em.common.dto.auth.LoginRequest;
import com.em.common.dto.auth.RegisterRequest;
import com.em.common.dto.auth.TokenValidationRequest;
import com.em.authservice.dto.response.AuthResponse;
import com.em.common.dto.auth.TokenValidResponse;
import com.em.authservice.service.AccountService;
import com.em.authservice.service.JwtService;
import com.em.common.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@AllArgsConstructor
public class AuthController {

    final private AccountService accountService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse authResponse = accountService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<?>> refreshToken(@RequestBody String refreshToken) {
        AuthResponse response = accountService.refreshToken(refreshToken);
        return ResponseEntity.ok(ApiResponse.success("Token refreshed successfully", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(Authentication authentication) {
        String username = authentication.getName();
        accountService.logout(username);
        return ResponseEntity.ok(ApiResponse.success("Logout successful", "User logged out successfully"));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request) {
        log.info("Registering user with username: {}", request.getUsername());
        log.info("Registering user with email: {}", request.getEmail());
        AuthResponse authResponse = accountService.register(request);
        return ResponseEntity.status(201).body(ApiResponse.created("Registration successful", authResponse));
    }

    @PostMapping("/validate-token")
    public ResponseEntity<ApiResponse<?>> validateToken(@Valid @RequestBody TokenValidationRequest request) {
        TokenValidResponse response = accountService.introspectToken(request.getToken());
        return ResponseEntity.ok(ApiResponse.success("Token validation successful", response));
    }
}
