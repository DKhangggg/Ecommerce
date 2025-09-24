package com.em.productservice.Service;

import com.em.productservice.Model.Category;
import com.em.productservice.Model.Product;
import com.em.productservice.Repository.CategoryRepository;
import com.em.productservice.Repository.ProductRepository;
import com.em.productservice.dto.request.ProductRequest;
import com.em.productservice.dto.response.CategoryResponse;
import com.em.productservice.dto.response.ProductResponse;
import com.em.productservice.exception.DuplicateProductException;
import com.em.productservice.exception.InvalidProductDataException;
import com.em.productservice.exception.ProductNotFoundException;
import com.em.productservice.exception.InsufficientStockException;
import com.em.productservice.exception.CategoryNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;  // Added CategoryRepository

    public List<ProductResponse> getAllProducts() {
        log.info("Fetching all products from database...");
        List<Product> products = productRepository.findAll();
        log.info("Found {} products in database", products.size());

        List<ProductResponse> productResponses = products.stream()
                .map(this::mapToProductResponse)
                .toList();
        log.info("Mapped {} products to response DTOs", productResponses.size());

        return productResponses;
    }

    public ProductResponse getProductById(String id) {
        log.info("Fetching product with ID: {}", id);
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        log.info("Found product: {}", product.getName());
        return mapToProductResponse(product);
    }

    private ProductResponse mapToProductResponse(Product product) {
        // Convert Category objects to CategoryResponse DTOs
        List<CategoryResponse> categoryResponses = product.getCategories() != null ?
            product.getCategories().stream()
                .map(this::mapToCategoryResponse)
                .toList() : List.of();

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .categories(categoryResponses)
                .imageUrls(product.getImageUrls())
                .attributes(product.getAttributes())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    private CategoryResponse mapToCategoryResponse(Category category) {
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

    public void createProduct(ProductRequest productRequest) {
        log.info("Creating new product: {}", productRequest.getName());

        // Check for duplicate product name
        if (productRepository.existsByName(productRequest.getName())) {
            throw new DuplicateProductException("Product with name '" + productRequest.getName() + "' already exists");
        }

        // Convert category IDs to Category objects
        List<Category> categories = List.of();
        if (productRequest.getCategoryIds() != null && !productRequest.getCategoryIds().isEmpty()) {
            categories = categoryRepository.findAllById(productRequest.getCategoryIds());

            // Validate that all categories exist
            if (categories.size() != productRequest.getCategoryIds().size()) {
                throw new CategoryNotFoundException("One or more category IDs not found");
            }
        }

        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        product.setStock(productRequest.getStock());
        product.setCategories(categories);  // Set Category objects instead of IDs
        product.setImageUrls(productRequest.getImageUrls());
        product.setAttributes(productRequest.getAttributes());

        Product savedProduct = productRepository.save(product);
        log.info("Product created successfully with ID: {}", savedProduct.getId());
    }

    public void updateProduct(String id, ProductRequest productRequest) {
        log.info("Updating product with ID: {}", id);

        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        // Check for duplicate name (excluding current product)
        Optional<Product> duplicateProduct = productRepository.findByName(productRequest.getName());
        if (duplicateProduct.isPresent() && !duplicateProduct.get().getId().equals(id)) {
            throw new DuplicateProductException("Product with name '" + productRequest.getName() + "' already exists");
        }

        // Convert category IDs to Category objects
        List<Category> categories = List.of();
        if (productRequest.getCategoryIds() != null && !productRequest.getCategoryIds().isEmpty()) {
            categories = categoryRepository.findAllById(productRequest.getCategoryIds());

            // Validate that all categories exist
            if (categories.size() != productRequest.getCategoryIds().size()) {
                throw new CategoryNotFoundException("One or more category IDs not found");
            }
        }

        existingProduct.setName(productRequest.getName());
        existingProduct.setDescription(productRequest.getDescription());
        existingProduct.setPrice(productRequest.getPrice());
        existingProduct.setStock(productRequest.getStock());
        existingProduct.setCategories(categories);  // Set Category objects instead of IDs
        existingProduct.setImageUrls(productRequest.getImageUrls());
        existingProduct.setAttributes(productRequest.getAttributes());

        productRepository.save(existingProduct);
        log.info("Product updated successfully: {}", existingProduct.getName());
    }

    public void deleteProduct(String id) {
        log.info("Deleting product with ID: {}", id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        productRepository.delete(product);
        log.info("Product deleted successfully: {}", product.getName());
    }

    public void updateStock(String id, Integer newStock) {
        log.info("Updating stock for product ID: {} to {}", id, newStock);

        if (newStock < 0) {
            throw new InvalidProductDataException("Stock cannot be negative");
        }

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        product.setStock(newStock);
        productRepository.save(product);
        log.info("Stock updated successfully for product: {}", product.getName());
    }

    public void decreaseStock(String id, Integer quantity) {
        log.info("Decreasing stock for product ID: {} by {}", id, quantity);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with ID " + id + " not found"));

        if (product.getStock() < quantity) {
            throw new InsufficientStockException(
                "Insufficient stock for product '" + product.getName() +
                "'. Available: " + product.getStock() + ", Requested: " + quantity
            );
        }

        product.setStock(product.getStock() - quantity);
        productRepository.save(product);
        log.info("Stock decreased successfully for product: {}", product.getName());
    }

}
