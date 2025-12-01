package com.em.common.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminOverviewResponse {

    private long totalUsers;
    private long totalSellers;
    private long totalProducts;
    private long totalInventoryItems;
}
