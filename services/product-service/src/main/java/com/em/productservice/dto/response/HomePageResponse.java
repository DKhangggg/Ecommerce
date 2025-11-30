package com.em.productservice.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HomePageResponse {

    private List<ProductResponse> featuredProducts;
    private List<ProductResponse> newArrivals;
    private List<ProductResponse> bestSellers;
}
