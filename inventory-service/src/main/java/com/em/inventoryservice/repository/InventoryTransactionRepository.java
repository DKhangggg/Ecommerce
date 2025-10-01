package com.em.inventoryservice.repository;

import com.em.inventoryservice.model.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface InventoryTransactionRepository extends JpaRepository<InventoryTransaction, Long> {
}
