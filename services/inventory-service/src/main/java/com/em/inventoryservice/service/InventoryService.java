package com.em.inventoryservice.service;

import com.em.commonevent.ProductCreatedEvent;
import com.em.inventoryservice.exception.InvalidQuantityException;
import com.em.inventoryservice.exception.InventoryNotFoundException;
import com.em.inventoryservice.model.Inventory;
import com.em.inventoryservice.model.STATUS;
import com.em.inventoryservice.repository.InventoryRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class InventoryService {
    private InventoryRepository inventoryRepo;

    public Inventory createInventory(com.em.common.dto.inventory.InRequest inventory) {
        // Validate input
        if (inventory.getQuantity() < 0) {
            throw new InvalidQuantityException("Quantity cannot be negative");
        }

        log.info("Creating new inventory for product {} at location {} with quantity {}",
                inventory.getProductId(), inventory.getLocation(), inventory.getQuantity());

        Inventory newInventory = new Inventory();
        newInventory.setProductId(inventory.getProductId());
        newInventory.setQuantity(inventory.getQuantity());
        newInventory.setReserved(0);
        newInventory.setLocation(inventory.getLocation());

        // Set status based on quantity
        updateInventoryStatus(newInventory);

        return inventoryRepo.save(newInventory);
    }

    public void createInventoryByEvent(ProductCreatedEvent event) {
        log.info("Received ProductCreatedEvent: {}", event);

        Inventory newInventory = new Inventory();
        newInventory.setProductId(event.getProductId());
        newInventory.setQuantity(event.getQuantity());
        newInventory.setLocation("DEFAULT_LOCATION");
        newInventory.setSellerId(event.getSellerId());
        newInventory.setReserved(0);
        newInventory.setStatus(STATUS.IN_STOCK);
        inventoryRepo.save(newInventory);
    }

    public Inventory getInventoryById(UUID id) {
        return inventoryRepo.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + id));
    }

    public Inventory updateInventory(java.util.UUID id, com.em.common.dto.inventory.InRequest inventory) {
        if (inventory.getQuantity() < 0) {
            throw new InvalidQuantityException("Quantity cannot be negative");
        }

        Inventory existingInventory = inventoryRepo.findById(id)
                .orElseThrow(() -> new InventoryNotFoundException("Inventory not found with ID: " + id));

        existingInventory.setProductId(inventory.getProductId());
        existingInventory.setQuantity(inventory.getQuantity());
        existingInventory.setLocation(inventory.getLocation());

        // Update status based on quantity
        updateInventoryStatus(existingInventory);

        log.info("Updated inventory {} with new quantity {}", id, inventory.getQuantity());
        recordTransaction(existingInventory, "UPDATE", inventory.getQuantity());

        return inventoryRepo.save(existingInventory);
    }

    private void updateInventoryStatus(Inventory inventory) {
        int availableStock = inventory.getQuantity() - inventory.getReserved();

        if (availableStock <= 0) {
            inventory.setStatus(STATUS.OUT_OF_STOCK);
        } else if (availableStock < 5) {
            inventory.setStatus(STATUS.LOW_STOCK);
        } else {
            inventory.setStatus(STATUS.IN_STOCK);
        }
    }

    private void recordTransaction(Inventory inventory, String action, int quantity) {
        log.info("Recording transaction: {} {} units for inventory {}", action, quantity, inventory.getId());
    }

    public List<Inventory> findAllBySellerId(String sellerId) {
        log.info("Fetching inventories for sellerId: {}", sellerId);
        List<Inventory> response = inventoryRepo.findAllBySellerId(sellerId);
        if (response.isEmpty()) {
            log.info("No inventories found for sellerId: {}", sellerId);
        } else {
            log.info("Found {} inventories for sellerId: {}", response.size(), sellerId);
        }
        return inventoryRepo.findAllBySellerId(sellerId);
    }
}
