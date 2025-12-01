package com.em.common.dto.favorite;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteItemDto {

    private String productId;
    private String productName;
    private String imageUrl;
    private double price;
}
