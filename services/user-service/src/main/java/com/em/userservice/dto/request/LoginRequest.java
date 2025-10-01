package com.em.userservice.dto.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.Setter;


@JsonDeserialize
@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;
}
