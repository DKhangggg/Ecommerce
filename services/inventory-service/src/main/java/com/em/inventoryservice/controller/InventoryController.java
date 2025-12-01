package com.em.inventoryservice.controller;

import com.em.common.dto.admin.CountResponse;
import com.em.common.dto.admin.InventoryStockSummaryDto;
import com.em.inventoryservice.model.Inventory;
import com.em.inventoryservice.service.InventoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/inventory")
@AllArgsConstructor
@Slf4j
public class InventoryController {
    private InventoryService inventoryService;

    @PostMapping()
    public ResponseEntity<Inventory> createInventory(@RequestBody com.em.common.dto.inventory.InRequest inventory) {
        Inventory createdInventory = inventoryService.createInventory(inventory);
        return ResponseEntity.ok(createdInventory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable UUID id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        return ResponseEntity.ok(inventory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable UUID id, @RequestParam com.em.common.dto.inventory.InRequest inventory) {
        Inventory updatedInventory = inventoryService.updateInventory(id, inventory);
        return ResponseEntity.ok(updatedInventory);
    }

    @GetMapping("/my-inventory")
    public ResponseEntity<List<Inventory>> getMyInventory(
            @RequestHeader("X-User-Id") String sellerId
    ) {
        log.info("Vào được inventoryservice - Lấy inventory cho sellerId: {}", sellerId);
        List<Inventory> inventories = inventoryService.findAllBySellerId(sellerId);
        return ResponseEntity.ok(inventories);
    }

    @GetMapping("/stock/{productId}")
    public ResponseEntity<Integer> getStockByProductId(@PathVariable("productId") String productId) {
        log.info("Fetching stock for productId: {}", productId);
        return inventoryService.findByProductId(productId)
                .map(inv -> {
                    int available = inv.getQuantity() - inv.getReserved();
                    return ResponseEntity.ok(available);
                })
                .orElseGet(() -> ResponseEntity.ok(0));
    }

    @GetMapping("/internal/admin/count")
    public ResponseEntity<CountResponse> countAllInventory() {
        long count = inventoryService.countAllInventory();
        return ResponseEntity.ok(CountResponse.builder().count(count).build());
    }

    @GetMapping("/internal/admin/stock-summary")
    public ResponseEntity<InventoryStockSummaryDto> getAdminStockSummary() {
        InventoryStockSummaryDto summary = inventoryService.getStockSummary();
        return ResponseEntity.ok(summary);
    }
}
