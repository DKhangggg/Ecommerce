package com.em.userservice.controller;

import com.em.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;



    @PostMapping("/me")
    public ResponseEntity<?> getUserDetails() {
        return ResponseEntity.ok(userService.getUserDetails());
    }
}
