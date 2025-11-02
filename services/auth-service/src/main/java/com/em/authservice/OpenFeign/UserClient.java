package com.em.authservice.OpenFeign;

import com.em.authservice.dto.request.UserCreate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service")
public interface UserClient {

    @PostMapping("/user/internal")
    void createUser(@RequestBody UserCreate request);
}
