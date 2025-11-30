package com.em.common.dto.auth;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonSerialize
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenValidResponse {
    private boolean valid;
    private String username;
    private List<String> roles;
}
