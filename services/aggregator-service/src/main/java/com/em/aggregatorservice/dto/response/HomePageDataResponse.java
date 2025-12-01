package com.em.aggregatorservice.dto.response;

import com.em.aggregatorservice.dto.product.HomePageResponse;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HomePageDataResponse {

    private HomePageResponse homePage;

    private int featuredCount;
    private int newArrivalsCount;
    private int bestSellersCount;
}
