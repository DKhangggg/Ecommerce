package com.em.authservice.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@JsonSerialize
@Builder
@Data
public class TokenValidResponse {
    private boolean valid;
    private String username;
    private List<String> roles;
}
