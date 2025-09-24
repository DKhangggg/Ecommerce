package com.em.productservice.dto.response;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@Builder
@JsonSerialize
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private String id;
    private String name;
    private String description;
    private double price;
    private int stock;
    private List<CategoryResponse> categories;  // Return full category info instead of just IDs
    private List<String> imageUrls;
    private Map<String, Object> attributes;
    private Instant createdAt;
    private Instant updatedAt;
}
