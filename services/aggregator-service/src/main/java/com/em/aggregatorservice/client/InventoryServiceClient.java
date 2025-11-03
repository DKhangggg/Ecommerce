package com.em.aggregatorservice.client;

import com.em.aggregatorservice.dto.inventory.Inventory;
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

    public Flux<Inventory> getInventoryBySellerId(String sellerId) {
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
                .doOnNext(Inventory ->
                        log.info("<= (InventoryServiceClient) THÀNH CÔNG cho sellerId: {}. Tên SP: {}",
                                sellerId, Inventory.getProductId())
                )
                .doOnError(error ->
                        log.error("<= (InventoryServiceClient) LỖI cho ID: {}. Message: {}",
                                sellerId, error.getMessage())
                );
    }
}
