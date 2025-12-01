package com.em.userservice.controller;

import com.em.common.dto.response.ApiResponse;
import com.em.common.dto.user.AddressCreateRequest;
import com.em.common.dto.user.AddressDto;
import com.em.common.dto.user.AddressUpdateRequest;
import com.em.common.dto.user.UserProfileResponse;
import com.em.common.dto.user.UserProfileUpdateRequest;
import com.em.userservice.dto.request.UserCreate;
import com.em.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    //@Autowired
    //private AuthServiceGRPC authServiceGRPC;

//    @GetMapping("/public/validate")
//    public ResponseEntity<TokenValidResponse> validateToken(@RequestParam("token") String token) {
//        TokenValidResponse response = authServiceGRPC.getToken(token);
//        return  ResponseEntity.ok(response);
//    }

    @PostMapping("/internal")
    public ResponseEntity<Void> createUser(@RequestBody UserCreate request) {
        userService.createUser(request);
        return ResponseEntity.status(201).build();
    }

    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> getProfile(
            @RequestHeader("X-User-Id") String userId
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        UserProfileResponse profile = userService.getProfile(uuid);
        return ResponseEntity.ok(ApiResponse.success("Profile fetched successfully", profile));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<UserProfileResponse>> updateProfile(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody UserProfileUpdateRequest request
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        UserProfileResponse profile = userService.updateProfile(uuid, request);
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", profile));
    }

    @GetMapping("/addresses")
    public ResponseEntity<ApiResponse<java.util.List<AddressDto>>> getAddresses(
            @RequestHeader("X-User-Id") String userId
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        java.util.List<AddressDto> addresses = userService.getAddressDtos(uuid);
        return ResponseEntity.ok(ApiResponse.success("Addresses fetched successfully", addresses));
    }

    @PostMapping("/addresses")
    public ResponseEntity<ApiResponse<AddressDto>> addAddress(
            @RequestHeader("X-User-Id") String userId,
            @RequestBody AddressCreateRequest request
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        AddressDto address = userService.addAddress(uuid, request);
        return ResponseEntity.ok(ApiResponse.created("Address created successfully", address));
    }

    @PutMapping("/addresses/{id}")
    public ResponseEntity<ApiResponse<AddressDto>> updateAddress(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable("id") Long id,
            @RequestBody AddressUpdateRequest request
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        AddressDto address = userService.updateAddress(uuid, id, request);
        return ResponseEntity.ok(ApiResponse.success("Address updated successfully", address));
    }

    @DeleteMapping("/addresses/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteAddress(
            @RequestHeader("X-User-Id") String userId,
            @PathVariable("id") Long id
    ) {
        java.util.UUID uuid = java.util.UUID.fromString(userId);
        userService.deleteAddress(uuid, id);
        return ResponseEntity.ok(ApiResponse.success("Address deleted successfully", null));
    }
}
