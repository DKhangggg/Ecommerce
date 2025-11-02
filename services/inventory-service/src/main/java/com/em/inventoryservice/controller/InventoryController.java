package com.em.inventoryservice.controller;

import com.em.inventoryservice.dto.request.InRequest;
import com.em.inventoryservice.model.Inventory;
import com.em.inventoryservice.service.InventoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/inventory")
@AllArgsConstructor
public class InventoryController {
    private InventoryService inventoryService;

    @PostMapping()
    public ResponseEntity<Inventory> createInventory(@RequestBody InRequest inventory) {
        Inventory createdInventory = inventoryService.createInventory(inventory);
        return ResponseEntity.ok(createdInventory);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable UUID id) {
        Inventory inventory = inventoryService.getInventoryById(id);
        return ResponseEntity.ok(inventory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable UUID id, @RequestParam InRequest inventory) {
        Inventory updatedInventory = inventoryService.updateInventory(id, inventory);
        return ResponseEntity.ok(updatedInventory);
    }

    @GetMapping("/my-inventory")
    public ResponseEntity<List<Inventory>> getMyInventory(
            @RequestHeader("X-User-Id") String sellerId
    ) {
        List<Inventory> inventories = inventoryService.findAllBySellerId(sellerId);
        return ResponseEntity.ok(inventories);
    }
}
