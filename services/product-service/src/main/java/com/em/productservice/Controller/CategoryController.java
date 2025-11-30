package com.em.productservice.Controller;

import com.em.productservice.dto.request.CategoryRequest;
import com.em.common.dto.product.CategoryResponse;
import com.em.productservice.Service.CategoryService;
import com.em.common.dto.response.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product-service")
@AllArgsConstructor
@Slf4j
public class CategoryController {

    private final CategoryService categoryService;

    // PUBLIC ENDPOINTS - Không cần authentication
    @GetMapping("/public/categories")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        log.info("Getting all categories...");
        List<CategoryResponse> categories = categoryService.getAllCategories();
        log.info("Found {} categories", categories.size());
        return ResponseEntity.ok(ApiResponse.success("Fetched categories successfully", categories));
    }

    @GetMapping("/public/categories/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable("id") String id) {
        log.info("Getting category by ID: {}", id);
        CategoryResponse category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(ApiResponse.success("Category fetched successfully", category));
    }

    // PRIVATE ENDPOINTS - Cần authentication và role ADMIN
    @PostMapping("/private/categories")
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@Valid @RequestBody CategoryRequest categoryRequest) {
        log.info("Creating category: {}", categoryRequest.getName());
        CategoryResponse createdCategory = categoryService.createCategory(categoryRequest);
        return ResponseEntity.ok(ApiResponse.created("Category created successfully", createdCategory));
    }

    @PutMapping("/private/categories/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> updateCategory(@PathVariable("id") String id, @Valid @RequestBody CategoryRequest categoryRequest) {
        log.info("Updating category with ID: {}", id);
        CategoryResponse updatedCategory = categoryService.updateCategory(id, categoryRequest);
        return ResponseEntity.ok(ApiResponse.success("Category updated successfully", updatedCategory));
    }

    @DeleteMapping("/private/categories/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteCategory(@PathVariable("id") String id) {
        log.info("Deleting category with ID: {}", id);
        categoryService.deleteCategory(id);
        return ResponseEntity.ok(ApiResponse.success("Category deleted successfully", null));
    }
}
