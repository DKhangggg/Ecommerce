package com.em.common.dto.product;

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

    // seo
    private String slug;
    // basic info
    private String name;
    private String description;
    // price info
    private double price;
    private Double salePrice;

    // inventory / stock
    private Integer stock; // aggregator uses int stock
    private boolean isAvailable;
    private boolean isFeatured;

    // social proof
    private Double averageRating;
    private Integer ratingCount;

    // categorization
    private String primaryCategoryName;
    private List<com.em.common.dto.product.CategoryResponse> categories;

    // media & attributes
    private List<String> imageUrls;
    private List<com.em.common.dto.product.AttributeDto> attributes;

    // metadata
    private String sellerId;
    private Instant createdAt;
    private Instant updatedAt;
}

