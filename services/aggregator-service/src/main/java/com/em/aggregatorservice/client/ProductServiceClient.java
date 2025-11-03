package com.em.aggregatorservice.client;

import com.em.aggregatorservice.dto.product.ProductResponse;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
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
                .bodyToMono(String.class) // Tạm thời đọc body thành String
                .doOnNext(jsonBody -> log.info("PRODUCT_SERVICE_RAW_RESPONSE: {}", jsonBody))

                .flatMap(jsonBody -> {
                    try {
                        ObjectMapper mapper = new ObjectMapper();
                        JavaType type = mapper.getTypeFactory().constructCollectionType(List.class, ProductResponse.class);
                        List<ProductResponse> list = mapper.readValue(jsonBody, type);

                        return Mono.just(list);

                    } catch (Exception e) {
                        log.error("LỖI JSON DESERIALIZATION: {}", e.getMessage(), e);
                        return Mono.error(new RuntimeException("Lỗi cấu trúc JSON từ Product Service"));
                    }
                });
    }
}
