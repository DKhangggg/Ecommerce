package com.em.inventoryservice.service;

import com.em.inventoryservice.dto.request.InRequest;
import com.em.inventoryservice.model.Inventory;
import com.em.inventoryservice.model.STATUS;
import com.em.inventoryservice.repository.InventoryRepository;
import com.em.inventoryservice.repository.InventoryTransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class InventoryService {
    private InventoryRepository inventoryRepo;
    private InventoryTransactionRepository inventoryTransactionRepo;


    public Inventory createInventory(InRequest inventory) {
        Inventory newInventory = new Inventory();
        newInventory.setProductId(inventory.getProductId());
        newInventory.setQuantity(inventory.getQuantity());
        newInventory.setReserved(0);
        newInventory.setLocation(inventory.getLocation());
        newInventory.setStatus(STATUS.IN_STOCK);
        return inventoryRepo.save(newInventory);
    }

    public Inventory getInventoryById(UUID id) {
        return inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));
    }

    public Inventory updateInventory(UUID id, InRequest inventory) {
        Inventory existingInventory = inventoryRepo.findById(id).orElseThrow(() -> new RuntimeException("Inventory not found"));
        existingInventory.setProductId(inventory.getProductId());
        existingInventory.setQuantity(inventory.getQuantity());
        existingInventory.setLocation(inventory.getLocation());
        // Update status based on quantity
        if (existingInventory.getQuantity() == 0) {
            existingInventory.setStatus(STATUS.OUT_OF_STOCK);
        } else if (existingInventory.getQuantity() < 5) { // Assuming low stock threshold is 5
            existingInventory.setStatus(STATUS.LOW_STOCK);
        } else {
            existingInventory.setStatus(STATUS.IN_STOCK);
        }
        recordTransaction(existingInventory, "UPDATE", inventory.getQuantity());
        return inventoryRepo.save(existingInventory);
    }

    private void recordTransaction(Inventory existingInventory, String update, int quantity) {
    }
}
