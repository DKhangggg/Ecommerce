package com.em.userservice.service;

import com.em.common.dto.user.AddressCreateRequest;
import com.em.common.dto.user.AddressDto;
import com.em.common.dto.user.AddressUpdateRequest;
import com.em.common.dto.user.UserProfileResponse;
import com.em.common.dto.user.UserProfileUpdateRequest;
import com.em.userservice.dto.request.UserCreate;
import com.em.userservice.model.Address;
import com.em.userservice.model.User;
import com.em.userservice.repository.AddressRepository;
import com.em.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;

    public void createUser(UserCreate user) {
        if(userRepository.existsById(user.getId())) {
            throw new RuntimeException("User already exists");
        }
        User newUser = new User();
        newUser.setId(user.getId());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setPhoneNumber(user.getPhoneNumber());
        newUser.setGender(user.getGender());
        newUser.setDateOfBirth(user.getDateOfBirth());
         userRepository.save(newUser);
    }
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Address> getAddresses(UUID userId) {
        return addressRepository.findByUserId(userId);
    }

    public UserProfileResponse getProfile(UUID userId) {
        User user = getUserById(userId);
        return UserProfileResponse.builder()
                .id(user.getId().toString())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .dateOfBirth(user.getDateOfBirth())
                .avatarUrl(user.getAvatarUrl())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public UserProfileResponse updateProfile(UUID userId, UserProfileUpdateRequest request) {
        User user = getUserById(userId);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(request.getGender());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setAvatarUrl(request.getAvatarUrl());
        user.setUpdatedAt(java.time.LocalDateTime.now());
        userRepository.save(user);
        return getProfile(userId);
    }

    public List<AddressDto> getAddressDtos(UUID userId) {
        return addressRepository.findByUserId(userId).stream()
                .map(this::toAddressDto)
                .toList();
    }

    public AddressDto addAddress(UUID userId, AddressCreateRequest request) {
        User user = getUserById(userId);
        Address address = new Address();
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setCountry(request.getCountry());
        address.setDefault(request.isDefault());
        address.setUser(user);
        Address saved = addressRepository.save(address);
        return toAddressDto(saved);
    }

    public AddressDto updateAddress(UUID userId, Long addressId, AddressUpdateRequest request) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Address does not belong to user");
        }
        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setZipCode(request.getZipCode());
        address.setCountry(request.getCountry());
        address.setDefault(request.isDefault());
        Address saved = addressRepository.save(address);
        return toAddressDto(saved);
    }

    public void deleteAddress(UUID userId, Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new RuntimeException("Address not found"));
        if (!address.getUser().getId().equals(userId)) {
            throw new RuntimeException("Address does not belong to user");
        }
        addressRepository.delete(address);
    }

    private AddressDto toAddressDto(Address address) {
        return AddressDto.builder()
                .id(address.getId())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .country(address.getCountry())
                .isDefault(address.isDefault())
                .build();
    }
}
