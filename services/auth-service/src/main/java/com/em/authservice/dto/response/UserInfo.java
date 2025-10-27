package com.em.authservice.dto.response;

import com.em.authservice.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfo {
    private UUID id;
    private String username;
    private Set<String> roles;
}
