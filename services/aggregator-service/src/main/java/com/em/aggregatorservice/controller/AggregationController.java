package com.em.aggregatorservice.controller;

import com.em.aggregatorservice.dto.product.HomePageResponse;
import com.em.aggregatorservice.dto.response.HomePageDataResponse;
import com.em.aggregatorservice.dto.response.SellerDashboardSummary;
import com.em.common.dto.response.ApiResponse;
import com.em.common.dto.admin.AdminOverviewResponse;
import com.em.common.dto.inventory.InventoryAggregateResponse;
import com.em.common.dto.product.ProductDetailWithStockResponse;
import com.em.aggregatorservice.service.AggregationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;
import com.em.common.dto.admin.AdminProductsSummaryResponse;
import com.em.common.dto.admin.InventoryStockSummaryDto;

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

    @GetMapping("/homepage-summary")
    public Mono<ApiResponse<HomePageDataResponse>> getHomepageSummary() {
        log.info("Received homepage-summary aggregation api request");
        return aggregationService.getHomepageSummary();
    }

    @GetMapping("/seller-dashboard")
    public Mono<ApiResponse<SellerDashboardSummary>> getSellerDashboard(@RequestHeader("X-User-Id") String userId,
                                                                       @RequestHeader("X-Roles") String roles) {
        log.info("Received seller-dashboard aggregation api request for userId: {} with roles: {}", userId, roles);
        return aggregationService.getSellerDashboard(userId, roles);
    }

    @GetMapping("/product/{id}")
    public Mono<ApiResponse<ProductDetailWithStockResponse>> getProductDetailWithStock(
            @PathVariable("id") String productId
    ) {
        log.info("Received product detail aggregation request for productId: {}", productId);
        return aggregationService.getProductDetailWithStock(productId);
    }

    @GetMapping("/admin/overview")
    public Mono<ApiResponse<AdminOverviewResponse>> getAdminOverview() {
        log.info("Received admin overview aggregation api request");
        return aggregationService.getAdminOverview();
    }

    @GetMapping("/admin/products-summary")
    public Mono<ApiResponse<AdminProductsSummaryResponse>> getAdminProductsSummary() {
        log.info("Received admin products-summary aggregation api request");
        return aggregationService.getAdminProductsSummary();
    }

    @GetMapping("/admin/inventory-summary")
    public Mono<ApiResponse<InventoryStockSummaryDto>> getAdminInventorySummary() {
        log.info("Received admin inventory-summary aggregation api request");
        return aggregationService.getAdminInventorySummary();
    }
}
