package com.em.authservice.controller;

import com.em.authservice.dto.request.LoginRequest;
import com.em.authservice.dto.request.RegisterRequest;
import com.em.authservice.dto.response.ApiResponse;
import com.em.authservice.dto.response.AuthResponse;
import com.em.authservice.service.AccountService;
import com.em.authservice.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .message("Login successful")
                .Status(200)
                .data(authResponse)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.ok(response);
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<ApiResponse<?>> refreshToken(@RequestBody String refreshToken) {
        AuthResponse Response = accountService.refreshToken(refreshToken);
        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .message("Token refreshed successfully")
                .Status(200)
                .data(Response)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.ok(response);
    }
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<?>> logout(Authentication  authentication) {
        String username = authentication.getName();
        accountService.logout(username);
        ApiResponse<String> response = ApiResponse.<String>builder()
                .message("Logout successful")
                .Status(200)
                .data(" logged out successfully")
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request) {
        AuthResponse authResponse = accountService.register(request);
        ApiResponse<AuthResponse> response = ApiResponse.<AuthResponse>builder()
                .message("Registration successful")
                .Status(201)
                .data(authResponse)
                .timestamp(String.valueOf(System.currentTimeMillis()))
                .build();
        return ResponseEntity.status(201).body(response);
    }
}
