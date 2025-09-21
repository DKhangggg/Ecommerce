package com.em.userservice.controller;

import com.em.userservice.dto.request.UserCreate;
import com.em.userservice.dto.response.TokenValidResponse;
import com.em.userservice.grpc.AuthServiceGRPC;
import com.em.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthServiceGRPC authServiceGRPC;

    @GetMapping("/validate")
    public ResponseEntity<TokenValidResponse> validateToken(@RequestParam("token") String token) {
        TokenValidResponse response = authServiceGRPC.getToken(token);
        return  ResponseEntity.ok(response);
    }

    @PostMapping("/internal")
    public ResponseEntity<Void> createUser(@RequestBody UserCreate request) {
        userService.createUser(request);
        return ResponseEntity.status(201).build();
    }
}
