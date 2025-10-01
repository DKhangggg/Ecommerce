# CRUD Test Cases for Product Service API

## Base URL
```
http://localhost:8083
```

## Category CRUD Operations

### 1. CREATE Category (POST)
**Endpoint:** `POST /categories`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "Electronics",
    "description": "Electronic devices and gadgets",
    "status": "ACTIVE",
    "products": []
}
```

### 2. GET All Categories
**Endpoint:** `GET /categories`
**No body required**

### 3. GET Category by ID
**Endpoint:** `GET /categories/{categoryId}`
**Example:** `GET /categories/68d42ad456eea8f8b6001cc2`
**No body required**

### 4. UPDATE Category (PUT)
**Endpoint:** `PUT /categories/{categoryId}`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "Consumer Electronics",
    "description": "Updated description for consumer electronics",
    "status": "ACTIVE",
    "products": ["product1", "product2"]
}
```

### 5. DELETE Category
**Endpoint:** `DELETE /categories/{categoryId}`
**No body required**

---

## Product CRUD Operations

### 1. CREATE Product (POST)
**Endpoint:** `POST /products`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "iPhone 15 Pro",
    "description": "Latest iPhone with advanced features",
    "price": 999.99,
    "stock": 50,
    "categoryIds": ["68d42ad456eea8f8b6001cc2"],
    "imageUrls": [
        "https://example.com/iphone15-1.jpg",
        "https://example.com/iphone15-2.jpg"
    ],
    "attributes": {
        "brand": "Apple",
        "color": "Space Black",
        "storage": "128GB",
        "warranty": "1 year"
    }
}
```

### 2. GET All Products
**Endpoint:** `GET /products`
**No body required**

### 3. GET Product by ID
**Endpoint:** `GET /products/{productId}`
**Example:** `GET /products/507f1f77bcf86cd799439011`
**No body required**

### 4. UPDATE Product (PUT)
**Endpoint:** `PUT /products/{productId}`
**Headers:**
```
Content-Type: application/json
```
**Body (JSON):**
```json
{
    "name": "iPhone 15 Pro Max",
    "description": "Updated description - Larger screen iPhone",
    "price": 1199.99,
    "stock": 30,
    "categoryIds": ["68d42ad456eea8f8b6001cc2"],
    "imageUrls": [
        "https://example.com/iphone15pro-1.jpg",
        "https://example.com/iphone15pro-2.jpg"
    ],
    "attributes": {
        "brand": "Apple",
        "color": "Natural Titanium",
        "storage": "256GB",
        "warranty": "1 year"
    }
}
```

### 5. DELETE Product
**Endpoint:** `DELETE /products/{productId}`
**No body required**

### 6. UPDATE Stock (PATCH)
**Endpoint:** `PATCH /products/{productId}/stock?stock=100`
**No body required**

### 7. DECREASE Stock (PATCH)
**Endpoint:** `PATCH /products/{productId}/decrease-stock?quantity=5`
**No body required**

---

## Additional Test Data Examples

### Category Examples:
```json
// Fashion Category
{
    "name": "Fashion",
    "description": "Clothing and accessories",
    "status": "ACTIVE",
    "products": []
}

// Books Category
{
    "name": "Books",
    "description": "Educational and entertainment books",
    "status": "ACTIVE",
    "products": []
}

// Home & Garden Category
{
    "name": "Home & Garden",
    "description": "Home improvement and garden supplies",
    "status": "INACTIVE",
    "products": []
}
```

### Product Examples:
```json
// Laptop Product
{
    "name": "MacBook Pro 16",
    "description": "High-performance laptop for professionals",
    "price": 2499.99,
    "stock": 25,
    "categoryIds": ["electronics_category_id"],
    "imageUrls": [
        "https://example.com/macbook-1.jpg"
    ],
    "attributes": {
        "brand": "Apple",
        "processor": "M3 Max",
        "ram": "32GB",
        "storage": "1TB SSD"
    }
}

// Book Product
{
    "name": "Clean Code",
    "description": "A handbook of agile software craftsmanship",
    "price": 45.99,
    "stock": 100,
    "categoryIds": ["books_category_id"],
    "imageUrls": [
        "https://example.com/clean-code.jpg"
    ],
    "attributes": {
        "author": "Robert C. Martin",
        "pages": 464,
        "publisher": "Prentice Hall",
        "language": "English"
    }
}

// T-Shirt Product
{
    "name": "Cotton T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "price": 19.99,
    "stock": 200,
    "categoryIds": ["fashion_category_id"],
    "imageUrls": [
        "https://example.com/tshirt-1.jpg",
        "https://example.com/tshirt-2.jpg"
    ],
    "attributes": {
        "size": "M",
        "color": "Blue",
        "material": "100% Cotton",
        "gender": "Unisex"
    }
}
```

---

## Expected Response Format

### Success Response:
```json
{
    "message": "Operation completed successfully",
    "status": 200,
    "data": {
        // Object data here
    },
    "timestamp": "2025-09-25T00:31:00.795Z"
}
```

### Error Response:
```json
{
    "message": "Error description",
    "status": 400,
    "data": null,
    "timestamp": "2025-09-25T00:31:00.795Z"
}
```

---

## Test Flow Recommendations

### 1. Basic Flow:
1. Create a Category first
2. Create a Product with the Category ID
3. Get all Categories and Products to verify
4. Update both Category and Product
5. Test GET by ID for both
6. Test stock operations for Product
7. Delete Product first, then Category

### 2. Validation Testing:
- Try creating products/categories with missing required fields
- Test with invalid data (negative stock, empty name, etc.)
- Test with non-existent IDs for GET/UPDATE/DELETE operations

### 3. Edge Cases:
- Test with very long descriptions
- Test with special characters in names
- Test with large stock numbers
- Test with empty arrays/objects
