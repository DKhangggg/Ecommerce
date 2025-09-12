package com.em.userservice.service;

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

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Address> getAddresses(UUID userId) {
        return addressRepository.findByUserId(userId);
    }

    public Address addAddress(UUID userId, Address address) {
        User user = getUserById(userId);
        address.setUser(user);
        return addressRepository.save(address);
    }

}
