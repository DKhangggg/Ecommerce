# Todo API & Services Overview

This document lists the APIs and backend services that are **needed** (or should be completed) for the current ecommerce project (buyer, seller, admin) based on the existing frontend pages and backend structure.

---

## 1. Frontend Pages vs Required APIs

### 1.1. Home page – `/` (frontend `app/(main)/page.tsx`)

**Current UI:**
- Uses hardcoded `getHomeSections()` with mock products.

**Target behaviour:**
- Call aggregator-service to fetch real homepage data.

**APIs to use / implement:**
- [x] `GET /api/public/aggregate/homepage-data` (via API Gateway → `aggregator-service` → `product-service`)
  - Status: Implemented.
  - Returns: `ApiResponse<HomePageResponse>` with `featuredProducts`, `newArrivals`, `bestSellers` (`ProductResponse` from `common-data`).
- [x] `GET /api/public/aggregate/homepage-summary`
  - Status: Implemented.
  - Returns: `ApiResponse<HomePageDataResponse>` with homepage + counts.

**Frontend TODO:**
- [ ] Replace mock `getHomeSections()` with real fetch to `/api/public/aggregate/homepage-data`.
- [ ] Map backend sections to UI sections (e.g. "Sản phẩm nổi bật", "Xả kho giá rẻ", "Dành riêng cho bạn").

---

### 1.2. Shop page – `/shop` (frontend `app/(main)/shop/page.tsx`)

**Current UI:**
- Filters for category, minPrice, maxPrice, but **does not call any API**.
- Renders `<ProductList />` without real data.

**Target behaviour:**
- Query product catalog from backend by filters.

**APIs needed:**
- [ ] `GET /api/public/product` (already exists in product-service, but needs filter support)
  - Backend: `ProductController.getAllProducts()` currently returns **all** products without filters.
  - TODO (product-service):
    - Extend to accept query params: `category`, `minPrice`, `maxPrice`, `keyword`, `page`, `size`, `sort`.
    - Implement filtering/paging using repository + optional `SpecificationBuilder` (in `common-data`).

**Optional aggregator API:**
- [ ] `GET /api/public/aggregate/products` (new)
  - Purpose: wrapper over product-service list, with possible inventory enrichment later.
  - Status: Not implemented.

**Frontend TODO:**
- [ ] In `/shop`, fetch product list using query params from URL.
- [ ] Update `ProductList` component to accept data from API.

---

### 1.3. Product detail page – `/product/[id]/[slug]` (frontend `app/(main)/product/[id]/[slug]/page.tsx`)

**Current UI:**
- Uses `MOCK_PRODUCTS` to render a product.

**Target behaviour:**
- Fetch product detail from backend.

**APIs to use:**
- [x] `GET /api/public/product/{id}`
  - Backend: `ProductController.getProductById()` → `ProductService.getProductById()`.
  - Returns: `ApiResponse<ProductResponse>` (shared DTO).

**Optional aggregator API:**
- [ ] `GET /api/public/aggregate/product/{id}` (new)
  - Purpose: combine product details + inventory data (stock, status).
  - Status: Not implemented.

**Frontend TODO:**
- [ ] Replace `getProductDetails(slug)` + `MOCK_PRODUCTS` with call to `/api/public/product/{id}` (or aggregator variant).
- [ ] Pass `ProductResponse` into `ProductDetailClient`.

---

### 1.4. Cart, Orders, Favorites, Account pages

Existing pages under `app/(main)/account/*` and `app/(main)/cart` are just skeletons; there are **no backend endpoints** wired yet.

**Expected APIs (not yet implemented):**

- Cart:
  - [ ] `GET /api/private/cart` – get current user cart.
  - [ ] `POST /api/private/cart/items` – add item to cart.
  - [ ] `PUT /api/private/cart/items/{itemId}` – update quantity.
  - [ ] `DELETE /api/private/cart/items/{itemId}` – remove item.
  - Likely new **cart-service** with shared DTOs (e.g., `CartItemDto`) in `common-data`.

- Orders:
  - [ ] `GET /api/private/orders` – list user orders (for `/account/orders`).
  - [ ] `GET /api/private/orders/{id}` – order details.
  - [ ] `POST /api/private/orders` – place order.
  - Likely new **order-service**, plus DTOs (`OrderRequest`, `OrderResponse`, `OrderItemDto`) in `common-data`.

- Favorites / Wishlist:
  - [ ] `GET /api/private/favorites` – list favorites.
  - [ ] `POST /api/private/favorites` – add favorite.
  - [ ] `DELETE /api/private/favorites/{productId}` – remove favorite.
  - Could be:
    - new **favorite-service**, or
    - part of **user-service**.
  - DTOs: `FavoriteItemDto` in `common-data`.

- Account settings / profile (user-service):
  - [ ] `GET /api/private/user/profile` – get current user profile.
  - [ ] `PUT /api/private/user/profile` – update profile.
  - [ ] `GET /api/private/user/addresses` – list addresses.
  - [ ] `POST /api/private/user/addresses` – add address.
  - [ ] `PUT /api/private/user/addresses/{id}` – update address.
  - [ ] `DELETE /api/private/user/addresses/{id}` – delete address.
  - Existing `UserController` only has `/user/internal` for internal create; needs public/private endpoints for logged-in users.


---

## 2. Seller Use Cases & Required APIs

The project supports seller users; aggregator already has seller-focused endpoints.

### 2.1. Aggregated inventory & dashboard (seller)

**Using aggregator-service:**

- [x] `GET /api/private/aggregate/inventory`
  - Headers: `X-User-Id`, `X-Roles` (must include `ROLE_SELLER`).
  - Returns: `ApiResponse<List<InventoryAggregateResponse>>`.
  - Backend flow:
    - `aggregator-service` → `InventoryServiceClient.getInventoryBySellerId()` → `inventory-service /inventory/my-inventory`.
    - Then calls `ProductServiceClient.getProductsByIds()` → `product-service /product/by-ids`.

- [x] `GET /api/private/aggregate/seller-dashboard`
  - Headers: `X-User-Id`, `X-Roles`.
  - Returns: `ApiResponse<SellerDashboardSummary>`.
  - Backend: counts `totalProducts`, `totalQuantity`, `lowStockCount` from inventory.

**Extra seller APIs (already exist in other services):**

- product-service:
  - [x] `POST /api/private/product` – create product (requires `ROLE_SELLER`).
  - [x] `PUT /api/private/product/{id}` – update product.
  - [x] `DELETE /api/private/product/{id}` – delete product.

**Optional aggregator APIs for seller:**

- [ ] `GET /api/private/aggregate/seller/products-overview`
  - Purpose: list seller products with inventory info (join product + inventory in aggregator instead of FE joining itself).
  - Not implemented yet.


---

## 3. Admin Use Cases & Required APIs (High-Level)

Currently there is **no dedicated admin API** implemented, but an ecommerce project usually needs admin dashboards.

**Suggested aggregator admin endpoints:**

- [ ] `GET /api/private/aggregate/admin/overview`
  - Summary for admin: `totalUsers`, `totalSellers`, `totalProducts`, `totalInventoryItems`.
  - Would call:
    - user-service: (new) `/user/internal/count` or similar.
    - product-service: (new) `/product/admin/count`.
    - inventory-service: (new) `/inventory/admin/count`.

- [ ] `GET /api/private/aggregate/admin/products-summary`
  - Stats by category, active/inactive.
  - Calls product-service for aggregated stats.

- [ ] `GET /api/private/aggregate/admin/inventory-summary`
  - Stats about stock levels, out-of-stock counts.
  - Calls inventory-service for aggregated stats.

**Backend services required:**

- [ ] Extend user-service, product-service, inventory-service with admin-only endpoints for counts and summaries.
- [ ] Add RBAC check (either at gateway or in services) to ensure only `ROLE_ADMIN` can call these.


---

## 4. Auth & Security APIs

auth-service already exposes core endpoints using DTOs from `common-data`:

- [x] `POST /api/public/auth/login` – login (AuthController.login).
- [x] `POST /api/public/auth/register` – register.
- [x] `POST /api/public/auth/refresh-token` – refresh.
- [x] `POST /api/public/auth/validate-token` – introspect/validate token.
- [x] `POST /api/private/auth/logout` – logout.

**Frontend TODO:**
- [ ] Wire login, register, logout in Next.js app using these endpoints (currently not implemented in code shown).

**CORS configuration** (gateway `CorsConfig`):
- Allowed origin: `http://localhost:5173` (frontend dev server).
- Headers allowed: `Authorization`, `Content-Type`, `X-User-Id`, `X-Roles`.

If frontend runs on a different port or domain, add it to `corsConfig.setAllowedOrigins`.


---

## 5. Shared DTOs in `common-data` (for reuse)

Already present and in use:

- `com.em.common.dto.response.ApiResponse`
- `com.em.common.dto.response.ErrorResponse`
- `com.em.common.dto.product.ProductResponse`
- `com.em.common.dto.product.CategoryResponse`
- `com.em.common.dto.product.AttributeDto`
- `com.em.common.dto.inventory.Inventory`
- `com.em.common.dto.inventory.InventoryAggregateResponse`
- `com.em.common.dto.inventory.InventoryTransaction`
- `com.em.common.dto.inventory.AggregatedTransactionResponse`
- `com.em.common.dto.inventory.DashboardResponse`
- `com.em.common.dto.inventory.InRequest`
- Auth/User:
  - `LoginRequest`, `RegisterRequest`, `TokenValidationRequest`, `TokenValidResponse`, `LoginResponse`

**Suggested new common DTOs to add for reuse:**

- [ ] `HomePageResponse` (shared)
  - Move a generic version from product-service/aggregator into `common-data`.
  - Fields: `featuredProducts`, `newArrivals`, `bestSellers` (all `List<ProductResponse>`).
  - Then both product-service and aggregator-service can use the same type.

- [ ] Cart DTOs: `CartItemDto`, `CartResponse`.
- [ ] Order DTOs: `OrderRequest`, `OrderResponse`, `OrderItemDto`.
- [ ] Favorites DTO: `FavoriteItemDto`.
- [ ] User profile DTOs: `UserProfileResponse`, `AddressDto`.


---

## 6. New Services Potentially Needed

Based on the current frontend and expected ecommerce features, the following services are **not yet present** but likely needed:

- [ ] **cart-service**
  - Responsible for shopping carts per user.
  - APIs under `/api/private/cart/**`.
  - Uses DTOs from `common-data`.

- [ ] **order-service**
  - Handles orders, order items, payments integration.
  - APIs under `/api/private/orders/**` and `/api/private/admin/orders/**`.

- [ ] **favorite-service** or extend **user-service**
  - Manages wishlist/favorites.
  - APIs under `/api/private/favorites/**`.

- [ ] **review-service** (optional but common)
  - Handles product reviews & ratings.
  - APIs under `/api/public/reviews/**` & `/api/private/reviews/**`.

---

## 7. Summary Checklist

### High Priority (for current UI)

- [ ] Wire frontend home page to `GET /api/public/aggregate/homepage-data`.
- [ ] Add filter/query support to `GET /api/public/product` for shop page.
- [ ] Replace mock product detail with `GET /api/public/product/{id}` (or new aggregator detail endpoint).
- [ ] Use `GET /api/private/aggregate/inventory` and `/seller-dashboard` for seller dashboard UI (once implemented on frontend).

### Medium Priority

- [ ] Implement cart endpoints & cart-service.
- [ ] Implement order endpoints & order-service.
- [ ] Implement profile/address endpoints in user-service.
- [ ] Implement favorites endpoints.

### Low Priority / Admin

- [ ] Implement admin overview/summary endpoints (in services + aggregator).
- [ ] Implement additional analytics endpoints.

