package com.em.userservice.service;

import com.em.userservice.dto.request.LoginRequest;
import com.em.userservice.dto.response.LoginResponse;
import com.em.userservice.exception.UserNameNotFound;
import com.em.userservice.model.User;
import com.em.userservice.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;


    public User getUserDetails() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepo.findUserByUsername(username)
                .orElseThrow(() -> new UserNameNotFound("User not found with username: " + username));
    }
}
