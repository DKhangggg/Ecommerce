package com.em.aggregatorservice.dto.product;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private String id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private List<CategoryResponse> categories;
    private List<String> imageUrls;
    private List<AttributeDto> attributes;
    private Instant createdAt;
    private Instant updatedAt;
}
