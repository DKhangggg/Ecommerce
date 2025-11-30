package com.em.aggregatorservice.client;

import com.em.common.dto.inventory.Inventory;
import com.em.common.dto.product.ProductResponse;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class InventoryServiceClient {

    private final WebClient webClient;

    public InventoryServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder
                .baseUrl("lb://inventory-service")
                .build();
    }

    public Flux<com.em.common.dto.inventory.Inventory> getInventoryBySellerId(String sellerId) {
        return this.webClient.get()
                .uri("/inventory/my-inventory")
                .header("X-User-Id", sellerId)
                .retrieve()
                .onStatus(status -> status == HttpStatus.NOT_FOUND,
                        clientResponse -> Mono.error(new RuntimeException("Inventory not found for sellerId: " + sellerId))
                )
                .onStatus(HttpStatusCode::is5xxServerError,
                        clientResponse -> Mono.error(new RuntimeException("Inventory Service is down"))
                )
                .bodyToFlux(Inventory.class).doOnSubscribe(subscription ->
                        log.info("=> (InventoryServiceClient) Đang gọi API lấy iventory by SellerId ID: {}", sellerId))
                .doOnNext(inv ->
                        log.info("<= (InventoryServiceClient) THÀNH CÔNG cho sellerId: {}. Tên SP: {}",
                                sellerId, inv.getProductId())
                )
                .doOnError(error ->
                        log.error("<= (InventoryServiceClient) LỖI cho ID: {}. Message: {}",
                                sellerId, error.getMessage())
                );
    }

    public Flux<com.em.common.dto.product.ProductResponse> getProductsByIds(List<String> productIds, String sellerId) {
        // Placeholder: aggregator currently does batch call through ProductServiceClient; keep signature for compatibility
        return Flux.empty(); // Placeholder
    }
}
