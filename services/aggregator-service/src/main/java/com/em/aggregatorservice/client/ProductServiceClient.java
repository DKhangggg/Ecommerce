package com.em.aggregatorservice.client;

import com.em.aggregatorservice.dto.product.HomePageResponse;
import com.em.common.dto.admin.AdminProductsSummaryResponse;
import com.em.common.dto.product.ProductResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
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

    public Mono<ProductResponse> getProductById(String productId) {
        log.info("=> (ProductServiceClient) Đang gọi API /product/{}", productId);
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/product/{id}")
                        .build(productId))
                .retrieve()
                .bodyToMono(new org.springframework.core.ParameterizedTypeReference<com.em.common.dto.response.ApiResponse<ProductResponse>>() {})
                .map(api -> api.getData());
    }

    public Mono<Long> getTotalProducts() {
        return this.webClient.get()
                .uri("/product/internal/admin/count")
                .retrieve()
                .bodyToMono(com.em.common.dto.admin.CountResponse.class)
                .map(com.em.common.dto.admin.CountResponse::getCount);
    }

    public Mono<AdminProductsSummaryResponse> getAdminProductsSummary() {
        return this.webClient.get()
                .uri("/product/internal/admin/products-summary")
                .retrieve()
                .bodyToMono(AdminProductsSummaryResponse.class);
    }
}
