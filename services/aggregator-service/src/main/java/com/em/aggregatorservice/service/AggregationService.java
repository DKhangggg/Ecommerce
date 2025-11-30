package com.em.aggregatorservice.service;

import com.em.aggregatorservice.client.InventoryServiceClient;
import com.em.aggregatorservice.client.ProductServiceClient;
import com.em.common.dto.response.ApiResponse;
import com.em.common.dto.inventory.AggregatedTransactionResponse;
import com.em.common.dto.inventory.InventoryAggregateResponse;
import com.em.common.dto.inventory.Inventory;
import com.em.common.dto.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.util.function.Tuple2;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class AggregationService {

    private final InventoryServiceClient inventoryService;
    private final ProductServiceClient productService;

    public Mono<ApiResponse<List<InventoryAggregateResponse>>> aggregateInventory(String sellerId, String roles) {

        // 1. Lấy Flux<Inventory> và gom thành Mono<List<Inventory>>
        // (Giả định: inventoryService.getInventoryBySellerId(sellerId) trả về Flux<Inventory>)
        // Collect inventories and process directly without assigning a typed Mono to avoid generic mismatch across modules
        return inventoryService.getInventoryBySellerId(sellerId).collectList().flatMap(inventoriesObj -> {

            @SuppressWarnings("unchecked")
            java.util.List<?> inventories = (java.util.List<?>) inventoriesObj;

            // Nếu danh sách rỗng, trả về thành công ngay lập tức
            if (inventories.isEmpty()) {
                log.info("Không tìm thấy inventory nào cho seller {} (roles={})", sellerId, roles);
                return Mono.just(ApiResponse.success("Không tìm thấy inventory", List.of()));
            }

            // 3. Trích xuất Product IDs
            java.util.List<String> productIds = inventories.stream()
                    .map(obj -> {
                        if (obj instanceof com.em.common.dto.inventory.Inventory) {
                            return ((com.em.common.dto.inventory.Inventory) obj).getProductId();
                        }
                        // fallback: try aggregator adapter type
                        try {
                            java.lang.reflect.Method m = obj.getClass().getMethod("getProductId");
                            Object pid = m.invoke(obj);
                            return pid != null ? pid.toString() : null;
                        } catch (Exception e) {
                            return null;
                        }
                    })
                    .filter(java.util.Objects::nonNull)
                    .distinct()
                    .collect(Collectors.toList());

            // 4. Gọi Product Service MỘT LẦN DUY NHẤT (Batch Fetching)
            var productsMono = productService.getProductsByIds(productIds, sellerId);

            // 5. Kết hợp List<Inventory> (đã có) và List<Product> (đang chờ)
            return Mono.zip(Mono.just(inventories), productsMono)
                     // 6. Map Tuple2 sang ApiResponse
                     .map(tuple -> {
                        // Lấy dữ liệu ra khỏi Tuple (cast at runtime to the expected common DTO types)
                         @SuppressWarnings("unchecked")
                         java.util.List<com.em.common.dto.inventory.Inventory> inventoriesList = (java.util.List<com.em.common.dto.inventory.Inventory>) tuple.getT1();
                         @SuppressWarnings("unchecked")
                         java.util.List<com.em.common.dto.product.ProductResponse> productsList = (java.util.List<com.em.common.dto.product.ProductResponse>) tuple.getT2();

                        // 7. Tạo một Map (key=productId) để Join dữ liệu O(1)
                        var productMap = productsList.stream()
                                .collect(Collectors.toMap(com.em.common.dto.product.ProductResponse::getId, Function.identity(), (existing, replacement) -> existing));

                        // 8. Lặp qua Inventory gốc và kết hợp
                        var aggregatedList = inventoriesList.stream()
                                .map(inventory -> {
                                    com.em.common.dto.product.ProductResponse product = productMap.get(inventory.getProductId());

                                    if (product == null) {
                                        // Bỏ qua inventory nếu không tìm thấy product tương ứng
                                        log.warn("Không tìm thấy product (trong map) cho productId: {}", inventory.getProductId());
                                        return null;
                                    }

                                    return this.mapToAggregatedDTO(inventory, product);
                                })
                                .filter(Objects::nonNull) // Lọc bỏ các mục bị bỏ qua
                                .collect(Collectors.toList());

                        log.info("Tổng hợp hoàn tất cho seller {}. Tổng cộng {} sản phẩm.", inventoriesList.get(0).getSellerId(), aggregatedList.size());
                        // Trả về ApiResponse
                        return ApiResponse.success("Tổng hợp thành công", aggregatedList);
                    })
                     // 9. Xử lý lỗi (Nếu Mono.zip thất bại)
                     .onErrorResume(ex -> {
                         log.error("LỖI KHI ZIP/MAP: {}", ex.getMessage());
                         return Mono.error(new RuntimeException("Lỗi tổng hợp dữ liệu từ Backend.")); // Ném lỗi để Global Handler bắt
                     });

            // --- KẾT THÚC KHỐI flatMap ---
        }); // <--- Dấu ngoặc nhọn đóng cho flatMap

    }

    private InventoryAggregateResponse mapToAggregatedDTO(Inventory inventory, ProductResponse product) {

        java.util.List<AggregatedTransactionResponse> mappedTransactions = inventory.getLatestTransaction()
                 .stream()
                 .map(tx -> {
                     com.em.common.dto.inventory.AggregatedTransactionResponse at = new com.em.common.dto.inventory.AggregatedTransactionResponse();
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

    // Simple stub to satisfy controller and allow incremental migration; implement real logic later
    public Mono<ApiResponse<List<com.em.common.dto.inventory.DashboardResponse>>> getDashboardData() {
        return Mono.just(ApiResponse.success("OK", java.util.List.of()));
    }
}
