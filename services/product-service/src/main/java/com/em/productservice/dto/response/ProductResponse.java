package com.em.productservice.dto.response;

import com.em.productservice.dto.request.AttributeDto;
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

    //seo
    private String slug;
    //basic info
    private String name;
    private String description;
    //price info
    private double price;
    private Double salePrice;

    //inventory info
    private boolean isAvailable;
    private boolean isFeatured;
    //social proof
    private Double averageRating;
    private Integer ratingCount;

    //categorization
    private String primaryCategoryName;
    private List<CategoryResponse> categories;
    //media & attributes
    private List<String> imageUrls;
    private List<AttributeDto> attributes;

    //metadata
    private String sellerId;
    private Instant createdAt;
    private Instant updatedAt;
}
