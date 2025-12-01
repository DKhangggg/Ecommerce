package com.em.aggregatorservice.client;

import com.em.common.dto.admin.CountResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class AuthServiceClient {

    private final WebClient webClient;

    public AuthServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("lb://auth-service")
                .build();
    }

    public Mono<Long> getTotalUsers() {
        return webClient.get()
                .uri("/internal/admin/user/count")
                .retrieve()
                .bodyToMono(CountResponse.class)
                .map(CountResponse::getCount);
    }

    public Mono<Long> getTotalSellers() {
        return webClient.get()
                .uri("/internal/admin/user/count-sellers")
                .retrieve()
                .bodyToMono(CountResponse.class)
                .map(CountResponse::getCount);
    }
}

