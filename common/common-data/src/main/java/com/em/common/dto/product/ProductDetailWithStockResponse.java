package com.em.common.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailWithStockResponse {

    private ProductResponse product;

    // Optional stock info; can be filled once inventory-service exposes stock-by-product endpoint
    private Integer stockQuantity;
    private String stockStatus;
}

