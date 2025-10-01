package com.em.inventoryservice.events;

import com.em.commonevent.ProductCreatedEvent;
import com.em.inventoryservice.service.InventoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class ProductEventConsumer {

    private final InventoryService inventoryService;

    @KafkaListener(topics = "PRODUCT_CREATED_EVENT", groupId = "inventory-group"
    )
    public void handleProductCreatedEvent(ProductCreatedEvent event) {
        log.info("Received event: {}", event);
        inventoryService.createInventoryByEvent(event);
    }
}