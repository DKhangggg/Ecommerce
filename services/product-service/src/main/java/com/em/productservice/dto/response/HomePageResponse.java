package com.em.productservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HomePageResponse {

    private java.util.List<com.em.common.dto.product.ProductResponse> featuredProducts;
    private java.util.List<com.em.common.dto.product.ProductResponse> newArrivals;
    private java.util.List<com.em.common.dto.product.ProductResponse> bestSellers;
}
