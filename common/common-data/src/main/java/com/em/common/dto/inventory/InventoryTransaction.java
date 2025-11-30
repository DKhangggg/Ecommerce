package com.em.common.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryTransaction {

    private Long id;
    private com.em.common.dto.inventory.Inventory inventory;
    private int quantityChanged;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

