package com.em.aggregatorservice.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class HomePageResponse {

    private List<com.em.common.dto.product.ProductResponse> featuredProducts;
    private List<com.em.common.dto.product.ProductResponse> newArrivals;
    private List<com.em.common.dto.product.ProductResponse> bestSellers;
}
