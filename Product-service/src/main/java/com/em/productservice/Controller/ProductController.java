package com.em.productservice.Controller;

import com.em.productservice.Service.ProductService;
import com.em.productservice.dto.request.ProductRequest;
import com.em.productservice.dto.response.ProductResponse;
import com.em.productservice.dto.response.ApiResponse;
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
public class ProductController {

    private final ProductService productService;

    // PUBLIC ENDPOINTS - Không cần authentication
    @GetMapping("/public/products")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        log.info("Getting all products...");
        List<ProductResponse> products = productService.getAllProducts();
        log.info("Found {} products", products.size());
        return ResponseEntity.ok(ApiResponse.success("Fetched products successfully", products));
    }

    @GetMapping("/public/products/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable String id) {
        log.info("Getting product by ID: {}", id);
        ProductResponse product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", product));
    }

    // PRIVATE ENDPOINTS - Cần authentication và role ADMIN
    @PostMapping("/private/products")
    public ResponseEntity<ApiResponse<?>> createProduct(@Valid @RequestBody ProductRequest productRequest) {
        log.info("Creating product: {}", productRequest.getName());
        productService.createProduct(productRequest);
        return ResponseEntity.ok(ApiResponse.created("Product created successfully", null));
    }

    @PutMapping("/private/products/{id}")
    public ResponseEntity<ApiResponse<?>> updateProduct(@PathVariable String id, @Valid @RequestBody ProductRequest productRequest) {
        log.info("Updating product with ID: {}", id);
        productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", null));
    }

    @DeleteMapping("/private/products/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteProduct(@PathVariable String id) {
        log.info("Deleting product with ID: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }

    @PatchMapping("/private/products/{id}/stock")
    public ResponseEntity<ApiResponse<?>> updateStock(@PathVariable String id, @RequestParam Integer stock) {
        log.info("Updating stock for product ID: {} to {}", id, stock);
        productService.updateStock(id, stock);
        return ResponseEntity.ok(ApiResponse.success("Stock updated successfully", null));
    }

    @PatchMapping("/private/products/{id}/decrease-stock")
    public ResponseEntity<ApiResponse<?>> decreaseStock(@PathVariable String id, @RequestParam Integer quantity) {
        log.info("Decreasing stock for product ID: {} by {}", id, quantity);
        productService.decreaseStock(id, quantity);
        return ResponseEntity.ok(ApiResponse.success("Stock decreased successfully", null));
    }
}
