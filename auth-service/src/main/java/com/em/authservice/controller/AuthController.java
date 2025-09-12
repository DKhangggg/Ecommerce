package com.em.authservice.controller;

import com.em.authservice.dto.request.LoginRequest;
import com.em.authservice.dto.request.RegisterRequest;
import com.em.authservice.dto.request.TokenValidationRequest;
import com.em.authservice.dto.response.ApiResponse;
import com.em.authservice.dto.response.AuthResponse;
import com.em.authservice.dto.response.TokenValidResponse;
import com.em.authservice.service.AccountService;
import com.em.authservice.service.JwtService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@Slf4j
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AccountService accountService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<?>> login(@RequestBody LoginRequest request){
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
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest request) {
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
