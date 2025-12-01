package com.em.aggregatorservice.controller;

import com.em.aggregatorservice.dto.product.HomePageResponse;
import com.em.common.dto.response.ApiResponse;
import com.em.common.dto.inventory.InventoryAggregateResponse;
import com.em.aggregatorservice.service.AggregationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@AllArgsConstructor
@Slf4j
public class AggregationController {

    private final AggregationService aggregationService;


    @GetMapping("/inventory")
    public Mono<ApiResponse<List<InventoryAggregateResponse>>> aggregateInventory(@RequestHeader("X-User-Id") String userId,
                                                                                  @RequestHeader("X-Roles") String roles) {
        log.info("Received inventory aggregation request for userId: {} with roles: {}", userId, roles);
        return aggregationService.aggregateInventory(userId, roles);
    }

    // Expose home page data using HTTP-interface based clients
    @GetMapping("/homepage-data")
    public Mono<ApiResponse<HomePageResponse>> getHomePage() {
        log.info("Received homepage-data aggregation api request");
        return aggregationService.getDashboardData();
    }
}
