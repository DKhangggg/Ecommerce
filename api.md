# API Overview

This document lists the main HTTP APIs exposed through the API Gateway (port `8080`), with paths normalized to the public/private routes the frontend will actually call.

> **Base URL:** `http://localhost:8080`

Status legend:
- `PUBLIC` – no auth required
- `PRIVATE` – user must be authenticated
- `ADMIN` – admin-only (ROLE_ADMIN)

---

## 1. Auth APIs (auth-service)

### 1.1. Login

- **Method:** `POST`
- **Path:** `/api/public/auth/login`
- **Access:** PUBLIC
- **Request body:** `LoginRequest`
  - `username` (string)
  - `password` (string)
- **Response:** `ApiResponse<AuthResponse>`
  - `AuthResponse` contains:
    - `accessToken` (string)
    - `refreshToken` (string)
    - `userInfo` (object)
      - `id` (UUID as string)
      - `username` (string)
      - `roles` (array of string)

### 1.2. Register

- **Method:** `POST`
- **Path:** `/api/public/auth/register`
- **Access:** PUBLIC
- **Request body:** `RegisterRequest`
  - includes username, password, email, firstName, lastName, phoneNumber, gender, dateOfBirth
- **Response:** `ApiResponse<AuthResponse>`

### 1.3. Refresh Token

- **Method:** `POST`
- **Path:** `/api/public/auth/refresh-token`
- **Access:** PUBLIC
- **Request body:** raw string refreshToken
- **Response:** `ApiResponse<AuthResponse>`

### 1.4. Validate Token

- **Method:** `POST`
- **Path:** `/api/public/auth/validate-token`
- **Access:** PUBLIC (used internally / by gateway)
- **Request body:** `TokenValidationRequest`
  - `token` (string)
- **Response:** `ApiResponse<TokenValidResponse>`
  - `username` (string)
  - `valid` (boolean)
  - `roles` (array of string)

### 1.5. Logout

- **Method:** `POST`
- **Path:** `/api/private/auth/logout`
- **Access:** PRIVATE
- **Headers:**
  - `Authorization: Bearer <accessToken>`
- **Response:** `ApiResponse<string>`

---

## 2. Public Product APIs (product-service)

> All paths via gateway start with `/api/public/product`.

### 2.1. List Products (with filters)

- **Method:** `GET`
- **Path:** `/api/public/product`
- **Access:** PUBLIC
- **Query params:**
  - `page` (int, optional, default 0)
  - `size` (int, optional, default 20)
  - `keyword` (string, optional)
  - `category` (string, optional, category slug / primaryCategoryName)
  - `minPrice` (double, optional)
  - `maxPrice` (double, optional)
- **Response:** `ApiResponse<List<ProductResponse>>`

### 2.2. Get Product by ID

- **Method:** `GET`
- **Path:** `/api/public/product/{id}`
- **Access:** PUBLIC
- **Path params:**
  - `id` (string – product id)
- **Response:** `ApiResponse<ProductResponse>`

### 2.3. Homepage Products (raw from product-service)

- **Method:** `GET`
- **Path:** `/api/public/product/homepage`
- **Access:** PUBLIC
- **Response:** service-level homepage response (for internal use; preferred public endpoint is via aggregator below).

---

## 3. Private Product APIs (seller)

### 3.1. Create Product

- **Method:** `POST`
- **Path:** `/api/private/product`
- **Access:** PRIVATE (ROLE_SELLER)
- **Headers:**
  - `Authorization: Bearer <token>`
  - gateway populates `X-User-Id`, `X-Roles`
- **Request body:** `ProductRequest`
  - `name`, `description`, `price`, `categoryIds`, `imageUrls`, `attributes`, `stock`, ...
- **Response:** `ApiResponse<Void>` (status + message)

### 3.2. Update Product

- **Method:** `PUT`
- **Path:** `/api/private/product/{id}`
- **Access:** PRIVATE (ROLE_SELLER)
- **Path params:**
  - `id` (string – product id)
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request body:** `ProductRequest`
- **Response:** `ApiResponse<Void>`

### 3.3. Delete Product

- **Method:** `DELETE`
- **Path:** `/api/private/product/{id}`
- **Access:** PRIVATE (ROLE_SELLER)
- **Path params:**
  - `id` (string)
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:** `ApiResponse<Void>`

---

## 4. Inventory APIs (inventory-service)

### 4.1. Seller Inventory List

- **Method:** `GET`
- **Path:** `/api/private/inventory/my-inventory`
- **Access:** PRIVATE (ROLE_SELLER)
- **Headers:**
  - `Authorization: Bearer <token>` → gateway sets `X-User-Id`
- **Response:** `List<Inventory>` (from `common-data`)

### 4.2. Stock by Product ID

- **Method:** `GET`
- **Path:** `/api/private/inventory/stock/{productId}`
- **Access:** PRIVATE (used mainly by aggregator-service)
- **Path params:**
  - `productId` (string)
- **Response:** `Integer` – available stock (`quantity - reserved`)

---

## 5. User Profile & Address APIs (user-service)

> Via gateway normalized to `/api/private/user/**`.

### 5.1. Get Current User Profile

- **Method:** `GET`
- **Path:** `/api/private/user/profile`
- **Access:** PRIVATE
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:** `ApiResponse<UserProfileResponse>`

### 5.2. Update Profile

- **Method:** `PUT`
- **Path:** `/api/private/user/profile`
- **Access:** PRIVATE
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request body:** `UserProfileUpdateRequest`
- **Response:** `ApiResponse<UserProfileResponse>`

### 5.3. List Addresses

- **Method:** `GET`
- **Path:** `/api/private/user/addresses`
- **Access:** PRIVATE
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:** `ApiResponse<List<AddressDto>>`

### 5.4. Add Address

- **Method:** `POST`
- **Path:** `/api/private/user/addresses`
- **Access:** PRIVATE
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request body:** `AddressCreateRequest`
- **Response:** `ApiResponse<AddressDto>`

### 5.5. Update Address

- **Method:** `PUT`
- **Path:** `/api/private/user/addresses/{id}`
- **Access:** PRIVATE
- **Path params:**
  - `id` (long – address id)
- **Headers:**
  - `Authorization: Bearer <token>`
- **Request body:** `AddressUpdateRequest`
- **Response:** `ApiResponse<AddressDto>`

### 5.6. Delete Address

- **Method:** `DELETE`
- **Path:** `/api/private/user/addresses/{id}`
- **Access:** PRIVATE
- **Path params:**
  - `id` (long)
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:** `ApiResponse<Void>`

---

## 6. Aggregator Public APIs (home + product detail)

Base path via gateway: `/api/public/aggregate/**`

### 6.1. Homepage Aggregated Data

- **Method:** `GET`
- **Path:** `/api/public/aggregate/homepage-data`
- **Access:** PUBLIC
- **Response:** `ApiResponse<HomePageResponse>` (aggregator version)

### 6.2. Homepage Summary

- **Method:** `GET`
- **Path:** `/api/public/aggregate/homepage-summary`
- **Access:** PUBLIC
- **Response:** `ApiResponse<HomePageDataResponse>`

### 6.3. Product Detail + Stock

- **Method:** `GET`
- **Path:** `/api/public/aggregate/product/{id}`
- **Access:** PUBLIC
- **Path params:**
  - `id` (string – product id)
- **Response:** `ApiResponse<ProductDetailWithStockResponse>`

---

## 7. Aggregator Private APIs (seller)

Base path: `/api/private/aggregate/**`

### 7.1. Seller Inventory Aggregation

- **Method:** `GET`
- **Path:** `/api/private/aggregate/inventory`
- **Access:** PRIVATE (ROLE_SELLER)
- **Headers:**
  - `Authorization: Bearer <token>` (gateway provides `X-User-Id`, `X-Roles`)
- **Response:** `ApiResponse<List<InventoryAggregateResponse>>`

### 7.2. Seller Dashboard Summary

- **Method:** `GET`
- **Path:** `/api/private/aggregate/seller-dashboard`
- **Access:** PRIVATE (ROLE_SELLER)
- **Headers:**
  - `Authorization: Bearer <token>`
- **Response:** `ApiResponse<SellerDashboardSummary>`

---

## 8. Aggregator Admin APIs

Base path: `/api/private/aggregate/admin/**`

### 8.1. Admin Overview

- **Method:** `GET`
- **Path:** `/api/private/aggregate/admin/overview`
- **Access:** ADMIN (ROLE_ADMIN)
- **Response:** `ApiResponse<AdminOverviewResponse>`

### 8.2. Admin Products Summary

- **Method:** `GET`
- **Path:** `/api/private/aggregate/admin/products-summary`
- **Access:** ADMIN
- **Response:** `ApiResponse<AdminProductsSummaryResponse>`

### 8.3. Admin Inventory Summary

- **Method:** `GET`
- **Path:** `/api/private/aggregate/admin/inventory-summary`
- **Access:** ADMIN
- **Response:** `ApiResponse<InventoryStockSummaryDto>`

---

## 9. Planned APIs (Cart, Order, Favorites)

DTOs đã sẵn trong `common-data`:

- **Cart:**
  - `CartItemDto`, `CartResponse`
- **Order:**
  - `OrderItemDto`, `OrderRequest`, `OrderResponse`
- **Favorites:**
  - `FavoriteItemDto`

Endpoints cụ thể sẽ được định nghĩa khi khởi tạo `cart-service`, `order-service`, `favorite-service`.

