package com.em.aggregatorservice.service;

import com.em.aggregatorservice.client.InventoryServiceClient;
import com.em.aggregatorservice.client.ProductServiceClient;
import com.em.aggregatorservice.dto.ApiResponse;
import com.em.aggregatorservice.dto.InPro.AggregatedTransactionResponse;
import com.em.aggregatorservice.dto.InPro.InventoryAggregateResponse;
import com.em.aggregatorservice.dto.inventory.Inventory;
import com.em.aggregatorservice.dto.product.ProductResponse;
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
        Mono<List<Inventory>> inventoryListMono = inventoryService.getInventoryBySellerId(sellerId)
                .collectList();

        // 2. Dùng flatMap trên Mono<List> để thực hiện Batch Fetching
        return inventoryListMono.flatMap(inventories -> {

            // --- BẮT ĐẦU KHỐI flatMap ---

            // Nếu danh sách rỗng, trả về thành công ngay lập tức
            if (inventories.isEmpty()) {
                log.info("Không tìm thấy inventory nào cho seller {}", sellerId);
                return Mono.just(ApiResponse.success("Không tìm thấy inventory", List.of()));
            }

            // 3. Trích xuất Product IDs
            List<String> productIds = inventories.stream()
                    .map(Inventory::getProductId)
                    .distinct()
                    .collect(Collectors.toList());

            // 4. Gọi Product Service MỘT LẦN DUY NHẤT (Batch Fetching)
            Mono<List<ProductResponse>> productsMono = productService.getProductsByIds(productIds, sellerId);

            // 5. Kết hợp List<Inventory> (đã có) và List<Product> (đang chờ)
            return Mono.zip(Mono.just(inventories), productsMono)
                    // 6. Map Tuple2 sang ApiResponse
                    .map((Tuple2<List<Inventory>, List<ProductResponse>> tuple) -> {
                        // Lấy dữ liệu ra khỏi Tuple
                        List<Inventory> inventoriesList = tuple.getT1();
                        List<ProductResponse> productsList = tuple.getT2();

                        // 7. Tạo một Map (key=productId) để Join dữ liệu O(1)
                        Map<String, ProductResponse> productMap = productsList.stream()
                                .collect(Collectors.toMap(ProductResponse::getId, Function.identity(), (existing, replacement) -> existing));

                        // 8. Lặp qua Inventory gốc và kết hợp
                        List<InventoryAggregateResponse> aggregatedList = inventoriesList.stream()
                                .map(inventory -> {
                                    ProductResponse product = productMap.get(inventory.getProductId());

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

        List<AggregatedTransactionResponse> mappedTransactions = inventory.getLatestTransaction()
                .stream()
                .map(tx -> new AggregatedTransactionResponse(
                        tx.getId(),
                        tx.getQuantityChanged(),
                        tx.getNote(),
                        tx.getCreatedAt()
                ))
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
}

