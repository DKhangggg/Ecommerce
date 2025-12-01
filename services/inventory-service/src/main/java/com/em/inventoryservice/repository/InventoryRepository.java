package com.em.inventoryservice.repository;

import com.em.inventoryservice.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, UUID> {

    List<Inventory> findAllBySellerId(String sellerId);

    Optional<Inventory> findByProductId(String productId);
}
