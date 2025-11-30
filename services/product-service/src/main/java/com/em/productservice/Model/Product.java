package com.em.productservice.Model;


import com.em.common.dto.product.AttributeDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "products")
public class Product {
    @Id
    private String id;
    @Indexed
    private String name;
    private String description;

    private String sellerId;

    private double price;
    private Double salePrice;
    @Indexed
    private boolean isFeatured;

    private Double averageRating;
    private Integer ratingCount;
    @Indexed
    private boolean isAvailable;
    @Indexed(unique = true)
    private String slug;

    @Indexed
    private String primaryCategoryName;

    @DBRef(lazy = true)
    private List<Category> categories;

    private List<String> imageUrls;
    private List<AttributeDto> attributes;

    @CreatedDate
    @Indexed
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
