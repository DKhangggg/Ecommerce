package com.em.productservice.Service;

import com.em.productservice.Model.Category;
import com.em.productservice.Repository.CategoryRepository;
import com.em.productservice.dto.request.CategoryRequest;
import com.em.productservice.dto.response.CategoryResponse;
import com.em.productservice.exception.CategoryNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Slf4j
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryResponse> getAllCategories() {
        log.info("Fetching all categories from database...");
        List<Category> categories = categoryRepository.findAll();
        log.info("Found {} categories in database", categories.size());

        List<CategoryResponse> responses = categories.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        log.info("Mapped {} categories to response DTOs", responses.size());

        return responses;
    }

    public CategoryResponse getCategoryById(String id) {
        log.info("Fetching category by ID: {}", id);
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Category not found with ID: {}", id);
                    return new CategoryNotFoundException("Category not found with ID: " + id);
                });

        log.info("Category found: {}", category.getName());
        return mapToResponse(category);
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        log.info("Creating new category: {}", categoryRequest.getName());

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .status(categoryRequest.getStatus())
                .products(categoryRequest.getProducts())
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        Category savedCategory = categoryRepository.save(category);
        log.info("Category created with ID: {}", savedCategory.getId());

        return mapToResponse(savedCategory);
    }

    public CategoryResponse updateCategory(String id, CategoryRequest categoryRequest) {
        log.info("Updating category with ID: {}", id);

        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Category not found with ID: {}", id);
                    return new CategoryNotFoundException("Category not found with ID: " + id);
                });

        existingCategory.setName(categoryRequest.getName());
        existingCategory.setDescription(categoryRequest.getDescription());
        existingCategory.setStatus(categoryRequest.getStatus());
        existingCategory.setProducts(categoryRequest.getProducts());
        existingCategory.setUpdatedAt(Instant.now());

        Category updatedCategory = categoryRepository.save(existingCategory);
        log.info("Category updated: {}", updatedCategory.getName());

        return mapToResponse(updatedCategory);
    }

    public void deleteCategory(String id) {
        log.info("Deleting category with ID: {}", id);

        if (!categoryRepository.existsById(id)) {
            log.error("Category not found with ID: {}", id);
            throw new CategoryNotFoundException("Category not found with ID: " + id);
        }

        categoryRepository.deleteById(id);
        log.info("Category deleted with ID: {}", id);
    }

    private CategoryResponse mapToResponse(Category category) {
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .status(category.getStatus())
                .products(category.getProducts())
                .createdAt(category.getCreatedAt() != null ?
                    LocalDateTime.ofInstant(category.getCreatedAt(), java.time.ZoneOffset.UTC) : null)
                .updatedAt(category.getUpdatedAt() != null ?
                    LocalDateTime.ofInstant(category.getUpdatedAt(), java.time.ZoneOffset.UTC) : null)
                .build();
    }
}
