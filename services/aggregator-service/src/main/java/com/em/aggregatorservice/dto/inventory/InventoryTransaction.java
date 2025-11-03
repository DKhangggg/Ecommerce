package com.em.aggregatorservice.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InventoryTransaction {

    private Long id;
    private Inventory inventory;
    private int quantityChanged;
    private String note;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
