package com.em.userservice.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class LoginResponse {
    private String AccessToken;
    private String RefreshToken;
}
