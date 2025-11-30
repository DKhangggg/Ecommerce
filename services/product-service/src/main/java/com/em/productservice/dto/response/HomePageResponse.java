package com.em.productservice.dto.response;

// Use fully-qualified common DTO to avoid shadowing
import com.em.common.dto.product.ProductResponse;
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
