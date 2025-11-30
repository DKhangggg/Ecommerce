package com.em.common.dto.user;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Data;

@JsonSerialize
@Data
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
}

