package com.em.common.dto.home;

import com.em.common.dto.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomePageResponse {

    private List<ProductResponse> featuredProducts;
    private List<ProductResponse> newArrivals;
    private List<ProductResponse> bestSellers;
}

