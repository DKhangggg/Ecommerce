package com.em.productservice.Service;

import com.em.commonevent.ProductCreatedEvent;
import com.em.productservice.Model.Category;
import com.em.productservice.Model.Product;
import com.em.productservice.Repository.CategoryRepository;
import com.em.productservice.Repository.ProductRepository;
import com.em.productservice.dto.request.ProductRequest;
import com.em.common.dto.product.CategoryResponse;
import com.em.productservice.dto.response.HomePageResponse;
import com.em.common.dto.product.ProductResponse;
import com.em.productservice.events.EventPublisherService;
import com.em.productservice.exception.CategoryNotFoundException;
import com.em.productservice.exception.DuplicateProductException;
import com.em.productservice.exception.InvalidProductDataException;
import com.em.productservice.exception.ProductNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

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
        // Convert Category objects to common CategoryResponse DTOs
        List<CategoryResponse> categoryResponses = product.getCategories() != null ?
                product.getCategories().stream()
                        .map(this::mapToCategoryResponse)
                        .toList() : List.of();

        // Build common ProductResponse instance
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

    public void createProduct(String sellerId, String roles, ProductRequest productRequest) {
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
        eventPublisher.publishEvent("PRODUCT_CREATED_EVENT", savedProduct.getId(), productCreatedEvent);
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


    public List<Product> findProductsByIdsAndSellerId(List<String> ids) {
        log.info("Finding products by IDs for seller ID: {}", ids);
        List<Product> productList = productRepository.findAllByIdIn(ids);
        if (productList.isEmpty()) {
            log.warn("No products found for the given IDs: {}", ids);
        } else {
            log.info("Found {} products for the given IDs", productList.size());
        }
        return productList;
    }

    public HomePageResponse getHomePageProducts(){
        log.info("Fetching homepage products asynchronously...");
        long startTime = System.currentTimeMillis();
        int FEATURED_LIMIT = 8;
        int NEW_ARRIVALS_LIMIT = 8;
        int MOST_LIKED_LIMIT = 8;
        CompletableFuture<List<Product>> featuredFuture = CompletableFuture.supplyAsync(()->productRepository
                .findByIsFeaturedTrue(PageRequest.of(0, FEATURED_LIMIT)));
        CompletableFuture<List<Product>> newArrialFuture=CompletableFuture.supplyAsync(()->productRepository
                .findByIsAvailableTrue(PageRequest.of(0, NEW_ARRIVALS_LIMIT)));
        CompletableFuture<List<Product>> mostLikedFuture=CompletableFuture.supplyAsync(()->productRepository
                .findByIsAvailableTrueOrderByAverageRatingDesc(PageRequest.of(0, MOST_LIKED_LIMIT)));
        CompletableFuture.allOf(featuredFuture,newArrialFuture,mostLikedFuture).join();
        try{
            List<ProductResponse> featuredProducts = mapToCardDto(featuredFuture.get());
            List<ProductResponse> newArrivalsProducts = mapToCardDto(newArrialFuture.get());
            List<ProductResponse> mostLikedProducts = mapToCardDto(mostLikedFuture.get());
            long endTime = System.currentTimeMillis();
            log.info("Fetched homepage products in {} ms", (endTime - startTime));
            return HomePageResponse.builder()
                    .featuredProducts(featuredProducts)
                    .newArrivals(newArrivalsProducts)
                    .bestSellers(mostLikedProducts)
                    .build();
        } catch(Exception e){
            log.error("Error fetching homepage products: {}", e.getMessage());
            throw new RuntimeException("Failed to fetch homepage products", e);
        }
    }

    private List<ProductResponse> mapToCardDto(List<Product> products) {
        if (products == null || products.isEmpty()) {
            return Collections.emptyList();
        }

        return products.stream().map(product -> ProductResponse.builder()
                 .id(product.getId())
                 .name(product.getName())
                 .slug(product.getSlug())
                 .price(product.getPrice())
                 .salePrice(product.getSalePrice())
                 .averageRating(product.getAverageRating())
                 .ratingCount(product.getRatingCount())
                 .attributes(product.getAttributes())
                 .imageUrls(product.getImageUrls())
                 .createdAt(product.getCreatedAt())
                 .description(product.getDescription())
                 .isAvailable(product.isAvailable())
                 .isFeatured(product.isFeatured())
                 .primaryCategoryName(product.getPrimaryCategoryName())
                 .sellerId(product.getSellerId())
                 .updatedAt(product.getUpdatedAt())
                 .build()).toList();
    }

    public List<ProductResponse> getAllProducts(Integer page, Integer size) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        int pageSize = size != null && size > 0 ? size : 20;

        var pageable = PageRequest.of(pageNumber, pageSize);
        log.info("Fetching products page={} size={}", pageNumber, pageSize);

        List<Product> products = productRepository.findAll(pageable).getContent();

        return products.stream()
                .map(this::mapToProductResponse)
                .toList();
    }

    public List<ProductResponse> getAllProducts(Integer page, Integer size, String keyword, String categorySlug,
                                               Double minPrice, Double maxPrice) {
        int pageNumber = page != null && page >= 0 ? page : 0;
        int pageSize = size != null && size > 0 ? size : 20;

        var pageable = PageRequest.of(pageNumber, pageSize);
        log.info("Fetching products with filters page={} size={} keyword={} categorySlug={} minPrice={} maxPrice={}",
                pageNumber, pageSize, keyword, categorySlug, minPrice, maxPrice);

        // For now, apply filters in memory to keep it simple with MongoRepository.
        // In future we can replace with custom MongoTemplate queries.
        List<Product> products = productRepository.findAll(pageable).getContent();

        return products.stream()
                .filter(p -> {
                    if (keyword != null && !keyword.isBlank()) {
                        String kw = keyword.toLowerCase();
                        boolean matchName = p.getName() != null && p.getName().toLowerCase().contains(kw);
                        boolean matchDesc = p.getDescription() != null && p.getDescription().toLowerCase().contains(kw);
                        if (!matchName && !matchDesc) return false;
                    }
                    if (categorySlug != null && !categorySlug.isBlank()) {
                        if (p.getPrimaryCategoryName() == null ||
                                !p.getPrimaryCategoryName().equalsIgnoreCase(categorySlug)) {
                            return false;
                        }
                    }
                    if (minPrice != null && p.getPrice() < minPrice) return false;
                    if (maxPrice != null && p.getPrice() > maxPrice) return false;
                    return true;
                })
                .map(this::mapToProductResponse)
                .toList();
    }
}
