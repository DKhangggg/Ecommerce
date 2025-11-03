package com.em.inventoryservice.service;

import com.em.commonevent.ProductCreatedEvent;
import com.em.inventoryservice.dto.request.InRequest;
import com.em.inventoryservice.exception.InsufficientStockException;
import com.em.inventoryservice.exception.InvalidQuantityException;
import com.em.inventoryservice.exception.InventoryNotFoundException;
import com.em.inventoryservice.model.Inventory;
import com.em.inventoryservice.model.STATUS;
import com.em.inventoryservice.repository.InventoryRepository;
import com.em.inventoryservice.repository.InventoryTransactionRepository;
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
    private InventoryTransactionRepository inventoryTransactionRepo;

    public Inventory createInventory(InRequest inventory) {
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

    public List<Inventory> getAllInventories() {
        return inventoryRepo.findAll();
    }

    public Inventory updateInventory(UUID id, InRequest inventory) {
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

    public void deleteInventory(UUID id) {
        if (!inventoryRepo.existsById(id)) {
            throw new InventoryNotFoundException("Inventory not found with ID: " + id);
        }
        inventoryRepo.deleteById(id);
        log.info("Deleted inventory with ID: {}", id);
    }

    public void reserveStock(UUID inventoryId, int quantity) {
        if (quantity <= 0) {
            throw new InvalidQuantityException("Reserve quantity must be positive");
        }

        Inventory inventory = getInventoryById(inventoryId);
        int availableStock = inventory.getQuantity() - inventory.getReserved();

        if (availableStock < quantity) {
            throw new InsufficientStockException("Insufficient available stock. Available: " + availableStock + ", Requested: " + quantity);
        }

        inventory.setReserved(inventory.getReserved() + quantity);
        updateInventoryStatus(inventory);
        inventoryRepo.save(inventory);

        log.info("Reserved {} units from inventory {}", quantity, inventoryId);
        recordTransaction(inventory, "RESERVE", quantity);
    }

    public void decreaseStock(UUID inventoryId, int quantity) {
        if (quantity <= 0) {
            throw new InvalidQuantityException("Decrease quantity must be positive");
        }

        Inventory inventory = getInventoryById(inventoryId);

        if (inventory.getQuantity() < quantity) {
            throw new InsufficientStockException("Insufficient stock. Available: " + inventory.getQuantity() + ", Requested: " + quantity);
        }

        inventory.setQuantity(inventory.getQuantity() - quantity);
        updateInventoryStatus(inventory);
        inventoryRepo.save(inventory);

        log.info("Decreased {} units from inventory {}", quantity, inventoryId);
        recordTransaction(inventory, "DECREASE", quantity);
    }

    public void increaseStock(UUID inventoryId, int quantity) {
        if (quantity <= 0) {
            throw new InvalidQuantityException("Increase quantity must be positive");
        }

        Inventory inventory = getInventoryById(inventoryId);
        inventory.setQuantity(inventory.getQuantity() + quantity);
        updateInventoryStatus(inventory);
        inventoryRepo.save(inventory);

        log.info("Increased {} units to inventory {}", quantity, inventoryId);
        recordTransaction(inventory, "INCREASE", quantity);
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
