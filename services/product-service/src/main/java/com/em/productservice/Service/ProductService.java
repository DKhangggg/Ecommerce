package com.em.productservice.Service;

import com.em.commonevent.ProductCreatedEvent;
import com.em.productservice.Model.Category;
import com.em.productservice.Model.Product;
import com.em.productservice.Repository.CategoryRepository;
import com.em.productservice.Repository.ProductRepository;
import com.em.productservice.dto.request.ProductRequest;
import com.em.productservice.dto.response.CategoryResponse;
import com.em.productservice.dto.response.ProductResponse;
import com.em.productservice.events.EventPublisherService;
import com.em.productservice.exception.DuplicateProductException;
import com.em.productservice.exception.InvalidProductDataException;
import com.em.productservice.exception.ProductNotFoundException;
import com.em.productservice.exception.InsufficientStockException;
import com.em.productservice.exception.CategoryNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Slf4j
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final EventPublisherService eventPublisher;

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

    public void createProduct(String sellerId,String roles,ProductRequest productRequest) {
        log.info("Creating new product: {}", productRequest.getName());
        String roleHeader = roles.toUpperCase();
        List<String> rolesList = Arrays.stream(roleHeader.split(","))
                .map(String::trim)
                .toList();
        log.info("User roles: {}", rolesList);
        if (rolesList.stream().noneMatch(r -> r.contains("ROLE_SELLER"))) {
            throw new InvalidProductDataException("Only users with SELLER role can create products");
        }
        if (productRepository.existsByName(productRequest.getName())) {
            throw new DuplicateProductException("Product with name '" + productRequest.getName() + "' already exists");
        }

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
        product.setCategories(categories);
        product.setImageUrls(productRequest.getImageUrls());
        product.setAttributes(productRequest.getAttributes());
        Product savedProduct = productRepository.save(product);
        log.info("Product created successfully with ID: {}", savedProduct.getId());
        ProductCreatedEvent productCreatedEvent = new ProductCreatedEvent();
        productCreatedEvent.setProductId(savedProduct.getId());
        productCreatedEvent.setName(savedProduct.getName());
        productCreatedEvent.setDescription(savedProduct.getDescription());
        productCreatedEvent.setSellerId(sellerId);
        productCreatedEvent.setQuantity(productRequest.getStock());
        eventPublisher.publishEvent("PRODUCT_CREATED_EVENT",savedProduct.getId(), productCreatedEvent);
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
}
