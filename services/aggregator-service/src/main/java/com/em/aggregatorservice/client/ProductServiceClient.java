package com.em.aggregatorservice.client;

import com.em.aggregatorservice.dto.product.ProductResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

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


    public Mono<List<ProductResponse>> getProductsByIds(List<String> productIds, String sellerId) {

        if (productIds == null || productIds.isEmpty()) {
            return Mono.just(List.of());
        }

        log.info("=> (ProductServiceClient) Đang gọi API /by-ids cho {} IDs", productIds.size());

        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/product/by-ids")
                        .queryParam("ids", String.join(",", productIds))
                        .build()
                )
                .header("X-User-Id", sellerId)
                .retrieve()
                .onStatus(HttpStatusCode::is5xxServerError,
                        clientResponse -> {
                            log.error("<= (ProductServiceClient) Product Service báo lỗi 5xx");
                            return Mono.error(new RuntimeException("Product Service (bulk) is down"));
                        }
                )
                .bodyToMono(new ParameterizedTypeReference<List<ProductResponse>>() {
                });
    }
}
