package com.em.common.dto.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartItemDto {

    private String productId;
    private String productName;
    private String imageUrl;
    private double price;
    private Integer quantity;
}
