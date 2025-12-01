package com.em.aggregatorservice.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SellerDashboardSummary {

    private String sellerId;
    private int totalProducts;
    private int totalQuantity;
    private int lowStockCount;

    public static SellerDashboardSummary empty() {
        return SellerDashboardSummary.builder()
                .sellerId(null)
                .totalProducts(0)
                .totalQuantity(0)
                .lowStockCount(0)
                .build();
    }
}

