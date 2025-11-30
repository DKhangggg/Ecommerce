package com.em.productservice.Controller;

import com.em.productservice.Service.CategoryService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product-service")
@AllArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    // PUBLIC ENDPOINTS - Không cần authentication
    @GetMapping("/public/categories")
    public ResponseEntity<com.em.common.dto.response.ApiResponse<java.util.List<com.em.common.dto.product.CategoryResponse>>> getAllCategories() {
        log.info("Getting all categories...");
        java.util.List<com.em.common.dto.product.CategoryResponse> categories = categoryService.getAllCategories();
        log.info("Found {} categories", categories.size());
        return ResponseEntity.ok(com.em.common.dto.response.ApiResponse.success("Fetched categories successfully", categories));
    }

    @GetMapping("/public/categories/{id}")
    public ResponseEntity<com.em.common.dto.response.ApiResponse<com.em.common.dto.product.CategoryResponse>> getCategoryById(@PathVariable("id") String id) {
        log.info("Getting category by ID: {}", id);
        com.em.common.dto.product.CategoryResponse category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(com.em.common.dto.response.ApiResponse.success("Category fetched successfully", category));
    }

    // PRIVATE ENDPOINTS - Cần authentication và role ADMIN
    @PostMapping("/private/categories")
    public ResponseEntity<com.em.common.dto.response.ApiResponse<com.em.common.dto.product.CategoryResponse>> createCategory(@Valid @RequestBody com.em.productservice.dto.request.CategoryRequest categoryRequest) {
        log.info("Creating category request: {}", categoryRequest);
        com.em.common.dto.product.CategoryResponse createdCategory = categoryService.createCategory(categoryRequest);
        return ResponseEntity.ok(com.em.common.dto.response.ApiResponse.created("Category created successfully", createdCategory));
    }

    @PutMapping("/private/categories/{id}")
    public ResponseEntity<com.em.common.dto.response.ApiResponse<com.em.common.dto.product.CategoryResponse>> updateCategory(@PathVariable("id") String id, @Valid @RequestBody com.em.productservice.dto.request.CategoryRequest categoryRequest) {
        log.info("Updating category with ID: {}", id);
        com.em.common.dto.product.CategoryResponse updatedCategory = categoryService.updateCategory(id, categoryRequest);
        return ResponseEntity.ok(com.em.common.dto.response.ApiResponse.success("Category updated successfully", updatedCategory));
    }

    @DeleteMapping("/private/categories/{id}")
    public ResponseEntity<com.em.common.dto.response.ApiResponse<Object>> deleteCategory(@PathVariable("id") String id) {
        log.info("Deleting category with ID: {}", id);
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(com.em.common.dto.response.ApiResponse.success("Category deleted successfully", null));
    }
}
