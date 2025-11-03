package com.em.aggregatorservice.dto.InPro;

import com.em.aggregatorservice.dto.product.AttributeDto;
import com.em.aggregatorservice.dto.product.CategoryResponse;
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
    private List<AggregatedTransactionResponse> latestTransactions;
    private LocalDateTime inventoryUpdatedAt;

    private String productId;
    private String productName;
    private String productDescription;
    private double price;
    private List<String> imageUrls;
    private List<AttributeDto> attributes;
    private List<CategoryResponse> categories;
    private Instant productCreatedAt;
}
