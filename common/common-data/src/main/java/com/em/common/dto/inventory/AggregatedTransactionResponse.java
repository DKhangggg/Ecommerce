package com.em.common.dto.inventory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AggregatedTransactionResponse {
    private Long id;
    private int quantityChanged;
    private String note;
    private LocalDateTime createdAt;
}

