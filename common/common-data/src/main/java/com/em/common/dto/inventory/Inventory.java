package com.em.common.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {

    private String id;
    private String sellerId;
    private String productId;
    private int quantity;
    private int reserved;
    private String location;

    private String status;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<com.em.common.dto.inventory.InventoryTransaction> latestTransaction;
}

