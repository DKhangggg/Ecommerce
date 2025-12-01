package com.em.aggregatorservice.client;

import com.em.common.dto.inventory.Inventory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Map;
import java.util.Set;

@Component
@Slf4j
public class InventoryServiceClient {

    private final WebClient webClient;

    public InventoryServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("lb://inventory-service")
                .build();
    }

    public Flux<Inventory> getInventoryBySellerId(String sellerId) {
        return this.webClient.get()
                .uri("/inventory/my-inventory")
                .header("X-User-Id", sellerId)
                .retrieve()
                .bodyToFlux(Inventory.class)
                .doOnSubscribe(subscription ->
                        log.info("=> (InventoryServiceClient) Đang gọi API lấy inventory by SellerId: {}", sellerId))
                .doOnNext(inv ->
                        log.info("<= (InventoryServiceClient) THÀNH CÔNG cho sellerId: {}. ProductId: {}",
                                sellerId, inv.getProductId())
                )
                .doOnError(error ->
                        log.error("<= (InventoryServiceClient) LỖI cho sellerId: {}. Message: {}",
                                sellerId, error.getMessage())
                );
    }

    public Mono<Map<String, Integer>> getBatchStock(Set<String> productIds) {
        // Tạm thời trả map trống cho enrich homepage; có thể triển khai sau khi có API batch-stock.
        return Mono.just(Map.of());
    }
}
