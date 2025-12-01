# Todo API & Services Overview

This document lists the APIs and backend services that are **needed** (or should be completed) for the current ecommerce project (buyer, seller, admin) based on the existing frontend pages and backend structure.

Status legend:
- ✅ Implemented & wired
- 🟡 Partially implemented / basic version
- ⏳ Not implemented yet

---

## 1. Frontend Pages vs Required APIs

### 1.1. Home page – `/` (frontend `app/(main)/page.tsx`)

**APIs:**
- ✅ `GET /api/public/aggregate/homepage-data` → aggregator → product-service `/product/homepage`.
- ✅ `GET /api/public/aggregate/homepage-summary` → aggregator summary.

### 1.2. Shop page – `/shop` (frontend `app/(main)/shop/page.tsx`)

**APIs:**
- 🟡 `GET /api/public/product`
  - Implemented with:
    - `page`, `size`, `keyword`, `category`, `minPrice`, `maxPrice` query params.
    - Filters currently applied in-memory on a paged result from MongoRepository.
  - Future improvement: move filters into Mongo query for better performance on large datasets.

### 1.3. Product detail page – `/product/[id]/[slug]`

**APIs:**
- ✅ `GET /api/public/product/{id}` – product-service → `ProductResponse`.
- ✅ `GET /api/public/aggregate/product/{id}` – aggregator combines:
  - product detail via product-service.
  - stock via inventory-service `/inventory/stock/{productId}`.
  - returns `ApiResponse<ProductDetailWithStockResponse>` (common-data DTO).

---

## 2. Seller Use Cases & Required APIs

### 2.1. Aggregated inventory & dashboard (seller)

**APIs (aggregator-service):**
- ✅ `GET /api/private/aggregate/inventory`
- ✅ `GET /api/private/aggregate/seller-dashboard`

### 2.2. Seller product management (product-service)

**APIs:**
- ✅ `POST /api/private/product` – create product.
- ✅ `PUT /api/private/product/{id}` – update product.
- ✅ `DELETE /api/private/product/{id}` – delete product.

Optional:
- ⏳ `GET /api/private/aggregate/seller/products-overview` – list seller products + inventory info.

---

## 3. Admin Use Cases & Required APIs (High-Level)

Admin-focused aggregation & stats:

**Aggregator admin endpoints:**
- ✅ `GET /api/private/aggregate/admin/overview` – total users, sellers, products, inventory items.
- ✅ `GET /api/private/aggregate/admin/products-summary` – stats by availability (AVAILABLE/UNAVAILABLE) and primary category.
- ✅ `GET /api/private/aggregate/admin/inventory-summary` – stock levels, in/low/out-of-stock counts.

Implemented supporting internal admin endpoints:
- **auth-service**
  - ✅ `GET /internal/admin/user/count` – total accounts.
  - ✅ `GET /internal/admin/user/count-sellers` – total accounts having `ROLE_SELLER`.
- **product-service**
  - ✅ `GET /product/internal/admin/count` – total products.
  - ✅ `GET /product/internal/admin/products-summary` – aggregated counts by availability and category (Mongo aggregation).
- **inventory-service**
  - ✅ `GET /inventory/internal/admin/count` – total inventory records.
  - ✅ `GET /inventory/internal/admin/stock-summary` – aggregated inventory stock summary (`InventoryStockSummaryDto`).

Still to implement for richer analytics:
- user-service – counts by role (if needed beyond auth-service roles).
- product-service – product counts by more granular status (if you introduce a dedicated status field).
- inventory-service – more detailed stock stats/groupings, if frontend needs dashboards beyond the current summary.

---

## 4. Auth & Security APIs

**auth-service:**
- ✅ `POST /api/public/auth/login`
- ✅ `POST /api/public/auth/register`
- ✅ `POST /api/public/auth/refresh-token`
- ✅ `POST /api/public/auth/validate-token`
- ✅ `POST /api/private/auth/logout`

Frontend TODO:
- ⏳ Wire login/register/logout in Next.js using these endpoints.

---

## 5. Shared DTOs in `common-data`

Already present & used:
- `ApiResponse`, `ErrorResponse`
- `ProductResponse`, `CategoryResponse`, `AttributeDto`
- `Inventory`, `InventoryAggregateResponse`, `InventoryTransaction`, `AggregatedTransactionResponse`, `DashboardResponse`, `InRequest`
- Auth: `LoginRequest`, `RegisterRequest`, `TokenValidationRequest`, `TokenValidResponse`, `LoginResponse`

New:
- ✅ `ProductDetailWithStockResponse` – wraps `ProductResponse` + `stockQuantity` + `stockStatus`.

Suggested new common DTOs (future):
- ⏳ Shared `HomePageResponse` (to replace duplicated versions in product/aggregator).
- ⏳ Cart DTOs: `CartItemDto`, `CartResponse`.
- ⏳ Order DTOs: `OrderRequest`, `OrderResponse`, `OrderItemDto`.
- ⏳ Favorites DTO: `FavoriteItemDto`.
- ⏳ User profile DTOs: `UserProfileResponse`, `AddressDto`.

---

## 6. New Services Potentially Needed

Not yet implemented, but recommended for full ecommerce:

- ⏳ **cart-service** – `/api/private/cart/**`.
- ⏳ **order-service** – `/api/private/orders/**`.
- ⏳ **favorite-service** (or extend user-service) – `/api/private/favorites/**`.
- ⏳ **review-service** – `/api/public/reviews/**`, `/api/private/reviews/**`.

---

## 7. Priority-ordered TODOs

Easier → Harder

1. 🟡 **Improve `/shop` filters & paging**
   - Already have filters backed by Mongo queries for category/price; still can add total count/total pages in response.

2. ✅ **Aggregator product detail with stock**
   - Done: `/api/public/aggregate/product/{id}`.

3. ✅ **Real stock in product detail**
   - Done via `inventory-service /inventory/stock/{productId}` + `InventoryServiceClient.getStockByProductId`.

4. ⏳ **Aggregator seller products overview**
   - New endpoint to list seller products + inventory info.

5. ✅ **User profile & addresses (user-service)**
   - Implemented: `GET/PUT /api/private/user/profile`, `GET/POST/PUT/DELETE /api/private/user/addresses`.

6. ⏳ **Cart service**
   - Implement basic CRUD for cart items.

7. ⏳ **Order service**
   - Implement order placement and listing.

8. ✅ **Admin analytics (aggregator + services)**
   - Admin overview, products-summary, and inventory-summary implemented end-to-end.
