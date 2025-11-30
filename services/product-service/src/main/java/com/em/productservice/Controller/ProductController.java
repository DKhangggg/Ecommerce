package com.em.productservice.Controller;

import com.em.common.dto.response.ApiResponse;
import com.em.productservice.Model.Product;
import com.em.productservice.Service.ProductService;
import com.em.productservice.dto.request.ProductRequest;
import com.em.productservice.dto.response.ProductResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@AllArgsConstructor
@Slf4j
public class ProductController {

    private final ProductService productService;

    //PUBLIC APIS

    @GetMapping()
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        log.info("Getting all products...");
        List<ProductResponse> products = productService.getAllProducts();
        log.info("Found {} products", products.size());
        return ResponseEntity.ok(ApiResponse.success("Fetched products successfully", products));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable("id") String id) {
        log.info("Getting product by ID: {}", id);
        ProductResponse product = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.success("Product fetched successfully", product));
    }
    @GetMapping("/homepage")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getHomePageProducts() {
        log.info("Getting homepage products...");
        List<ProductResponse> products = productService.getHomePageProducts();
        log.info("Found {} homepage products", products.size());
        return ResponseEntity.ok(ApiResponse.success("Fetched homepage products successfully", products));
    }

    //PRIVATE APIS

    @PostMapping()
    public ResponseEntity<ApiResponse<?>> createProduct(@RequestHeader("X-User-Id") String userId,
                                                        @RequestHeader("X-Roles") String roles,
                                                        @Valid @RequestBody ProductRequest productRequest) {
        log.info("Creating product: {}", productRequest.getName());
        productService.createProduct(userId, roles, productRequest);
        return ResponseEntity.ok(ApiResponse.created("Product created successfully", null));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<?>> updateProduct(@PathVariable("id") String id, @Valid @RequestBody ProductRequest productRequest) {
        log.info("Updating product with ID: {}", id);
        productService.updateProduct(id, productRequest);
        return ResponseEntity.ok(ApiResponse.success("Product updated successfully", null));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Object>> deleteProduct(@PathVariable("id") String id) {
        log.info("Deleting product with ID: {}", id);
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Product deleted successfully", null));
    }


    @GetMapping("/by-ids")
    public ResponseEntity<List<Product>> getProductsByIds(
            @RequestParam(value = "ids", required = false) List<String> ids,
            @RequestHeader("X-User-Id") String sellerId
    ) {
        if (ids == null || ids.isEmpty()) {
            log.info("Request /by-ids nhận được ds ID rỗng, trả về ds rỗng.");
            return ResponseEntity.ok(List.of());
        }
        log.info("Lấy products theo IDs: {} cho sellerId: {}", ids, sellerId);
        List<Product> products = productService.findProductsByIdsAndSellerId(ids);
        return ResponseEntity.ok(products);
    }

}
