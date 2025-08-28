package com.em.authservice.config;

import net.devh.boot.grpc.server.security.authentication.BasicGrpcAuthenticationReader;
import net.devh.boot.grpc.server.security.authentication.GrpcAuthenticationReader;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GrpcConfig {

    @Bean
    @ConditionalOnMissingBean
    public GrpcAuthenticationReader grpcAuthenticationReader() {
        return new BasicGrpcAuthenticationReader();
    }
}
