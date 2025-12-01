package com.em.aggregatorservice.client;

import com.em.aggregatorservice.dto.product.HomePageResponse;
import com.em.common.dto.product.ProductResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;

@Component
@Slf4j
public class ProductServiceClient {

    private final WebClient webClient;

    public ProductServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("lb://product-service")
                .build();
    }

    public Mono<HomePageResponse> getHomepage() {
        log.info("=> (ProductServiceClient) Đang gọi API /product/homepage");
        return this.webClient.get()
                .uri("/product/homepage")
                .retrieve()
                .bodyToMono(HomePageResponse.class);
    }

    public Mono<List<ProductResponse>> getProductsByIds(List<String> productIds, String sellerId) {

        if (productIds == null || productIds.isEmpty()) {
            return Mono.just(Collections.emptyList());
        }

        log.info("=> (ProductServiceClient) Đang gọi API /product/by-ids cho {} IDs", productIds.size());

        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/product/by-ids")
                        .queryParam("ids", String.join(",", productIds))
                        .build())
                .header("X-User-Id", sellerId)
                .retrieve()
                .bodyToFlux(ProductResponse.class)
                .collectList();
    }
}
