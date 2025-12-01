package com.em.aggregatorservice.service;

import com.em.aggregatorservice.client.InventoryServiceClient;
import com.em.aggregatorservice.client.ProductServiceClient;
import com.em.aggregatorservice.dto.product.HomePageResponse;
import com.em.aggregatorservice.dto.response.HomePageDataResponse;
import com.em.aggregatorservice.dto.response.SellerDashboardSummary;
import com.em.common.dto.response.ApiResponse;
import com.em.common.dto.inventory.AggregatedTransactionResponse;
import com.em.common.dto.inventory.InventoryAggregateResponse;
import com.em.common.dto.inventory.Inventory;
import com.em.common.dto.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AggregationService {

    private final InventoryServiceClient inventoryService;
    private final ProductServiceClient productService;

    public Mono<ApiResponse<List<InventoryAggregateResponse>>> aggregateInventory(String sellerId, String roles) {

        return inventoryService.getInventoryBySellerId(sellerId)
                .collectList()
                .flatMap(inventories -> {

                    if (inventories.isEmpty()) {
                        log.info("Không tìm thấy inventory nào cho seller {} (roles={})", sellerId, roles);
                        return Mono.just(ApiResponse.success("Không tìm thấy inventory", List.of()));
                    }

                    List<String> productIds = inventories.stream()
                            .map(Inventory::getProductId)
                            .filter(Objects::nonNull)
                            .distinct()
                            .collect(Collectors.toList());

                    var productsMono = productService.getProductsByIds(productIds, sellerId);

                    return Mono.zip(Mono.just(inventories), productsMono)
                            .map(tuple -> {
                                List<Inventory> inventoriesList = tuple.getT1();
                                List<ProductResponse> productsList = tuple.getT2();

                                var productMap = productsList.stream()
                                        .collect(Collectors.toMap(ProductResponse::getId, Function.identity(), (existing, replacement) -> existing));

                                var aggregatedList = inventoriesList.stream()
                                        .map(inventory -> {
                                            ProductResponse product = productMap.get(inventory.getProductId());

                                            if (product == null) {
                                                log.warn("Không tìm thấy product (trong map) cho productId: {}", inventory.getProductId());
                                                return null;
                                            }

                                            return this.mapToAggregatedDTO(inventory, product);
                                        })
                                        .filter(Objects::nonNull)
                                        .collect(Collectors.toList());

                                log.info("Tổng hợp hoàn tất cho seller {}. Tổng cộng {} sản phẩm.", inventoriesList.get(0).getSellerId(), aggregatedList.size());
                                return ApiResponse.success("Tổng hợp thành công", aggregatedList);
                            })
                            .onErrorResume(ex -> {
                                log.error("LỖI KHI ZIP/MAP: {}", ex.getMessage());
                                return Mono.error(new RuntimeException("Lỗi tổng hợp dữ liệu từ Backend."));
                            });
                });
    }

    private InventoryAggregateResponse mapToAggregatedDTO(Inventory inventory, ProductResponse product) {

        List<AggregatedTransactionResponse> mappedTransactions = inventory.getLatestTransaction()
                .stream()
                .map(tx -> {
                    AggregatedTransactionResponse at = new AggregatedTransactionResponse();
                    at.setId(tx.getId());
                    at.setQuantityChanged(tx.getQuantityChanged());
                    at.setNote(tx.getNote());
                    at.setCreatedAt(tx.getCreatedAt());
                    return at;
                })
                .collect(Collectors.toList());

        return InventoryAggregateResponse.builder()

                .inventoryId(inventory.getId())
                .quantity(inventory.getQuantity())
                .reserved(inventory.getReserved())
                .inventoryStatus(inventory.getStatus())
                .location(inventory.getLocation())
                .latestTransactions(mappedTransactions)
                .inventoryUpdatedAt(inventory.getUpdatedAt())

                .productId(product.getId())
                .productName(product.getName())
                .productDescription(product.getDescription())
                .price(product.getPrice())
                .imageUrls(product.getImageUrls())
                .attributes(product.getAttributes())
                .categories(product.getCategories())
                .productCreatedAt(product.getCreatedAt())

                .build();
    }

    public Mono<ApiResponse<HomePageResponse>> getDashboardData() {
        return productService.getHomepage()
                .flatMap(this::enrichWithInventory)
                .map(enrichedHomeData -> ApiResponse.success("Dashboard data fetched successfully", enrichedHomeData));
    }

    public Mono<ApiResponse<HomePageDataResponse>> getHomepageSummary() {
        return productService.getHomepage()
                .flatMap(this::enrichWithInventory)
                .map(home -> {
                    int featuredCount = home.getFeaturedProducts() != null ? home.getFeaturedProducts().size() : 0;
                    int newArrivalsCount = home.getNewArrivals() != null ? home.getNewArrivals().size() : 0;
                    int bestSellersCount = home.getBestSellers() != null ? home.getBestSellers().size() : 0;

                    HomePageDataResponse dto = HomePageDataResponse.builder()
                            .homePage(home)
                            .featuredCount(featuredCount)
                            .newArrivalsCount(newArrivalsCount)
                            .bestSellersCount(bestSellersCount)
                            .build();

                    return ApiResponse.success("Homepage summary fetched successfully", dto);
                });
    }

    public Mono<ApiResponse<SellerDashboardSummary>> getSellerDashboard(String sellerId, String roles) {
        return inventoryService.getInventoryBySellerId(sellerId)
                .collectList()
                .map(inventories -> {
                    if (inventories.isEmpty()) {
                        return ApiResponse.success("No inventory found for seller", SellerDashboardSummary.empty());
                    }

                    int totalProducts = (int) inventories.stream()
                            .map(Inventory::getProductId)
                            .filter(Objects::nonNull)
                            .distinct()
                            .count();

                    int totalQuantity = inventories.stream()
                            .mapToInt(Inventory::getQuantity)
                            .sum();

                    long lowStockCount = inventories.stream()
                            .filter(inv -> inv.getQuantity() < 5)
                            .count();

                    SellerDashboardSummary summary = SellerDashboardSummary.builder()
                            .sellerId(sellerId)
                            .totalProducts(totalProducts)
                            .totalQuantity(totalQuantity)
                            .lowStockCount((int) lowStockCount)
                            .build();

                    return ApiResponse.success("Seller dashboard fetched successfully", summary);
                });
    }

    private Mono<HomePageResponse> enrichWithInventory(HomePageResponse homeData) {
        Set<String> allProductIds = extractAllIds(homeData);

        if (allProductIds.isEmpty()) {
            return Mono.just(homeData);
        }

        return inventoryService.getBatchStock(allProductIds)
                .map(inventoryMap -> {

                    fillStockData(homeData.getBestSellers(), inventoryMap);
                    fillStockData(homeData.getNewArrivals(), inventoryMap);
                    fillStockData(homeData.getFeaturedProducts(), inventoryMap);

                    return homeData;
                })
                .onErrorResume(e -> {
                    log.error("Lỗi khi gọi Inventory Service: {}", e.getMessage());
                    return Mono.just(homeData);
                });
    }

    private Set<String> extractAllIds(HomePageResponse homeData) {
        Set<String> ids = new HashSet<>();

        addIdsToSet(homeData.getBestSellers(), ids);
        addIdsToSet(homeData.getNewArrivals(), ids);
        addIdsToSet(homeData.getFeaturedProducts(), ids);

        return ids;
    }

    private void addIdsToSet(List<ProductResponse> products, Set<String> ids) {
        if (products != null && !products.isEmpty()) {
            products.forEach(p -> ids.add(p.getId()));
        }
    }

    private void fillStockData(List<ProductResponse> products, Map<String, Integer> stockMap) {
        if (products == null || products.isEmpty()) return;

        products.forEach(p -> {
            Integer stock = stockMap.getOrDefault(p.getId(), 0);
            // If ProductResponse later supports these fields, they can be set here.
            // p.setStockQuantity(stock);
            // p.setStockStatus(stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK");
        });
    }
}
