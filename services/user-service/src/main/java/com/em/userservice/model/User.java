package com.em.userservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private UUID id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String gender;
    private LocalDate dateOfBirth;

    private String avatarUrl;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Address> addresses = new ArrayList<>();
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
