package com.em.common.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryAggregateResponse {
    private String inventoryId;
    private int quantity;
    private int reserved;
    private String inventoryStatus;
    private String location;
    private List<com.em.common.dto.inventory.AggregatedTransactionResponse> latestTransactions;
    private LocalDateTime inventoryUpdatedAt;

    private String productId;
    private String productName;
    private String productDescription;
    private double price;
    private List<String> imageUrls;
    private List<com.em.common.dto.product.AttributeDto> attributes;
    private List<com.em.common.dto.product.CategoryResponse> categories;
    private Instant productCreatedAt;
}

