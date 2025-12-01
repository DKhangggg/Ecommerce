package com.em.common.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryStockSummaryDto {
    private long totalInventoryItems;
    private long totalQuantity;
    private long totalReserved;
    private long inStockCount;
    private long lowStockCount;
    private long outOfStockCount;
}

