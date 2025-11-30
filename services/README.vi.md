# Microservices

Thư mục này chứa tất cả các microservices tạo nên backend của nền tảng thương mại điện tử.

## 📁 Cấu Trúc

```
services/
├── auth-service/         # Xác thực & Phân quyền
├── user-service/         # Quản lý Người dùng
├── product-service/      # Danh mục Sản phẩm
├── inventory-service/    # Quản lý Kho hàng
└── aggregator-service/   # Tầng Tổng hợp Dữ liệu
```

## 🏗️ Tổng Quan Kiến Trúc

Nền tảng tuân theo kiến trúc microservices với các patterns sau:

- **Service Discovery**: Netflix Eureka cho đăng ký service động
- **API Gateway**: Spring Cloud Gateway cho routing và load balancing
- **Event-Driven**: Apache Kafka cho giao tiếp bất đồng bộ
- **Database Per Service**: Mỗi service có database riêng
- **gRPC**: Giao tiếp giữa các service hiệu suất cao
- **RESTful APIs**: Endpoints HTTP cho client

## 📦 Các Services

### 1. auth-service

**Mục đích**: Xử lý xác thực và phân quyền cho nền tảng.

**Port**: `8081`

**Trách nhiệm**:
- Xác thực người dùng (đăng nhập/đăng xuất)
- Tạo và xác thực JWT token
- Cơ chế refresh token
- Quản lý mật khẩu
- Tích hợp với Keycloak IAM
- Kiểm soát truy cập dựa trên vai trò (RBAC)

**Công nghệ**:
- Spring Boot 3.5.4
- Spring Security
- JWT (jjwt 0.11.5)
- Keycloak Client
- PostgreSQL

**Endpoints chính**:
```
POST   /api/auth/login       - Đăng nhập người dùng
POST   /api/auth/register    - Đăng ký người dùng
POST   /api/auth/logout      - Đăng xuất người dùng
POST   /api/auth/refresh     - Làm mới access token
POST   /api/auth/validate    - Xác thực token
```

**Database**: PostgreSQL
- Thông tin đăng nhập người dùng
- Refresh tokens
- Quản lý session

**Dependencies**:
```xml
<dependency>
    <groupId>com.em</groupId>
    <artifactId>common-data</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
</dependency>
```

---

### 2. user-service

**Mục đích**: Quản lý hồ sơ người dùng và các thao tác liên quan đến người dùng.

**Port**: `8082`

**Trách nhiệm**:
- Quản lý hồ sơ người dùng (CRUD)
- Tùy chọn và cài đặt người dùng
- Quản lý địa chỉ
- Lịch sử đơn hàng
- Quản lý danh sách yêu thích
- Xác minh người dùng
- Vô hiệu hóa tài khoản

**Công nghệ**:
- Spring Boot 3.5.4
- Spring Data JPA
- PostgreSQL
- Spring Cloud Eureka Client
- gRPC Server

**Endpoints chính**:
```
GET    /api/users/{id}           - Lấy người dùng theo ID
PUT    /api/users/{id}           - Cập nhật hồ sơ người dùng
DELETE /api/users/{id}           - Xóa người dùng
GET    /api/users/{id}/addresses - Lấy địa chỉ người dùng
POST   /api/users/{id}/addresses - Thêm địa chỉ mới
GET    /api/users/{id}/wishlist  - Lấy danh sách yêu thích
POST   /api/users/{id}/wishlist  - Thêm vào danh sách yêu thích
```

**Database**: PostgreSQL
- Bảng Users (Người dùng)
- Bảng Addresses (Địa chỉ)
- Tùy chọn người dùng
- Sản phẩm yêu thích

**gRPC Services**:
- `UserService` - Truy vấn người dùng nội bộ cho các services khác

**Event Publishing (Xuất bản sự kiện)**:
- `UserCreated` - Khi tạo người dùng mới
- `UserUpdated` - Khi cập nhật hồ sơ người dùng
- `UserDeleted` - Khi xóa người dùng

---

### 3. product-service

**Mục đích**: Quản lý danh mục sản phẩm và các danh mục.

**Port**: `8083`

**Trách nhiệm**:
- Quản lý danh mục sản phẩm (CRUD)
- Quản lý danh mục
- Tìm kiếm và lọc sản phẩm
- Thuộc tính và đặc tả sản phẩm
- Hình ảnh và media sản phẩm
- Sản phẩm nổi bật
- Trạng thái sẵn có của sản phẩm
- Slugs thân thiện với SEO

**Công nghệ**:
- Spring Boot 3.5.4
- Spring Data MongoDB
- MongoDB
- Apache Kafka (Producer)
- Spring Cloud Eureka Client

**Endpoints chính**:
```
GET    /api/products              - Liệt kê tất cả sản phẩm (có phân trang)
GET    /api/products/{id}         - Lấy sản phẩm theo ID
GET    /api/products/slug/{slug}  - Lấy sản phẩm theo slug
POST   /api/products              - Tạo sản phẩm mới (SELLER/ADMIN)
PUT    /api/products/{id}         - Cập nhật sản phẩm (SELLER/ADMIN)
DELETE /api/products/{id}         - Xóa sản phẩm (ADMIN)
GET    /api/products/search       - Tìm kiếm sản phẩm
GET    /api/products/featured     - Lấy sản phẩm nổi bật
GET    /api/categories            - Liệt kê tất cả danh mục
POST   /api/categories            - Tạo danh mục (ADMIN)
```

**Database**: MongoDB
```javascript
// Products Collection - Bộ sưu tập Sản phẩm
{
  _id: ObjectId,
  name: String,              // Tên sản phẩm
  slug: String,              // Đường dẫn thân thiện SEO
  description: String,       // Mô tả
  sellerId: String,          // ID người bán
  price: Number,             // Giá
  salePrice: Number,         // Giá giảm
  primaryCategoryName: String, // Tên danh mục chính
  categories: [ObjectId],    // Tham chiếu đến Category
  imageUrls: [String],       // URLs hình ảnh
  attributes: [{             // Thuộc tính
    name: String,            // Tên thuộc tính
    value: String            // Giá trị
  }],
  isFeatured: Boolean,       // Sản phẩm nổi bật
  isAvailable: Boolean,      // Còn hàng
  averageRating: Number,     // Đánh giá trung bình
  ratingCount: Number,       // Số lượng đánh giá
  createdAt: ISODate,        // Ngày tạo
  updatedAt: ISODate         // Ngày cập nhật
}

// Categories Collection - Bộ sưu tập Danh mục
{
  _id: ObjectId,
  name: String,              // Tên danh mục
  description: String,       // Mô tả
  status: String,            // Trạng thái
  products: [String],        // IDs sản phẩm
  createdAt: ISODate,        // Ngày tạo
  updatedAt: ISODate         // Ngày cập nhật
}
```

**Event Publishing (Xuất bản sự kiện)**:
- `ProductCreated` - Khi tạo sản phẩm mới
- `ProductUpdated` - Khi cập nhật sản phẩm
- `ProductDeleted` - Khi xóa sản phẩm
- `ProductPriceChanged` - Khi giá sản phẩm thay đổi

**Tính năng**:
- Tìm kiếm toàn văn
- Lọc theo danh mục
- Lọc theo khoảng giá
- Lọc theo thuộc tính
- Phân trang và sắp xếp
- Hỗ trợ upload hình ảnh
- Tạo slug tự động cho SEO

---

### 4. inventory-service

**Mục đích**: Quản lý kho hàng và mức tồn kho sản phẩm.

**Port**: `8084`

**Trách nhiệm**:
- Quản lý mức tồn kho
- Theo dõi hàng tồn kho
- Đặt hàng (cho đơn hàng)
- Cảnh báo hàng sắp hết
- Cập nhật kho hàng
- Đồng bộ hóa tồn kho
- Quản lý kho

**Công nghệ**:
- Spring Boot 3.5.4
- Spring Data MongoDB
- MongoDB
- Apache Kafka (Consumer/Producer)
- Spring Cloud Eureka Client
- gRPC Server

**Endpoints chính**:
```
GET    /api/inventory/{productId}       - Lấy tồn kho cho sản phẩm
PUT    /api/inventory/{productId}       - Cập nhật tồn kho
POST   /api/inventory/reserve           - Đặt hàng cho đơn hàng
POST   /api/inventory/release           - Giải phóng hàng đã đặt
GET    /api/inventory/low-stock         - Lấy sản phẩm sắp hết hàng
POST   /api/inventory/bulk-update       - Cập nhật tồn kho hàng loạt
```

**Database**: MongoDB
```javascript
{
  _id: ObjectId,
  productId: String,          // ID sản phẩm
  availableQuantity: Number,  // Số lượng có sẵn
  reservedQuantity: Number,   // Số lượng đã đặt
  totalQuantity: Number,      // Tổng số lượng
  warehouseLocation: String,  // Vị trí kho
  lowStockThreshold: Number,  // Ngưỡng cảnh báo hết hàng
  lastRestocked: ISODate,     // Lần nhập hàng cuối
  updatedAt: ISODate          // Ngày cập nhật
}
```

**Event Consumption (Tiêu thụ sự kiện)**:
- `ProductCreated` - Khởi tạo tồn kho cho sản phẩm mới
- `OrderPlaced` - Đặt hàng cho đơn hàng
- `OrderCancelled` - Giải phóng hàng đã đặt

**Event Publishing (Xuất bản sự kiện)**:
- `StockUpdated` - Khi mức tồn kho thay đổi
- `LowStockAlert` - Khi tồn kho dưới ngưỡng
- `OutOfStock` - Khi sản phẩm hết hàng

**gRPC Services**:
- `InventoryService` - Kiểm tra tình trạng tồn kho cho các services khác

---

### 5. aggregator-service

**Mục đích**: Tổng hợp dữ liệu từ nhiều services để client sử dụng.

**Port**: `8085`

**Trách nhiệm**:
- Kết hợp dữ liệu từ nhiều services
- Giảm số lượng API calls từ phía client
- Cung cấp dữ liệu sản phẩm được làm giàu
- Tổng hợp dữ liệu trang chủ
- Chi tiết sản phẩm với tồn kho
- Đề xuất sản phẩm dựa trên người dùng
- Thao tác hàng loạt
- Cache dữ liệu

**Công nghệ**:
- Spring Boot 3.5.4
- Spring WebFlux (Reactive)
- gRPC Client
- REST Client (WebClient)
- Redis (cho caching)
- Spring Cloud Eureka Client

**Endpoints chính**:
```
GET    /api/aggregate/products/{id}     - Sản phẩm với tồn kho và đánh giá
GET    /api/aggregate/home              - Dữ liệu trang chủ (sản phẩm nổi bật, danh mục)
GET    /api/aggregate/user/{id}/profile - Hồ sơ người dùng với đơn hàng và yêu thích
GET    /api/aggregate/products/search   - Tìm kiếm sản phẩm với trạng thái tồn kho
GET    /api/aggregate/cart/validate     - Xác thực giỏ hàng với tồn kho hiện tại
```

**Tích hợp Service**:
```
Aggregator Service
    ├─> Product Service (REST/gRPC)
    ├─> Inventory Service (gRPC)
    ├─> User Service (gRPC)
    └─> Auth Service (REST)
```

**Ví dụ Tổng hợp Dữ liệu**:

1. **Chi tiết Sản phẩm**:
```json
{
  "product": { /* từ product-service */ },
  "inventory": { /* từ inventory-service */ },
  "seller": { /* từ user-service */ }
}
```

2. **Dữ liệu Trang chủ**:
```json
{
  "featuredProducts": [ /* với tồn kho */ ],
  "categories": [ /* từ product-service */ ],
  "bestSellers": [ /* dữ liệu tổng hợp */ ]
}
```

**Tính năng**:
- Gọi service song song
- Circuit breaker pattern
- Cache response
- Xử lý lỗi và fallbacks
- Loại bỏ request trùng lặp

---

## 🔧 Các Patterns Chung

### Service Discovery (Khám phá Service)
Tất cả services đăng ký với Eureka:

```yaml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    preferIpAddress: true
```

### Cấu hình Database

**MongoDB (Product, Inventory)**:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/ten_database
```

**PostgreSQL (User, Auth)**:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ten_database
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
```

### Cấu hình Kafka
```yaml
spring:
  kafka:
    bootstrap-servers: localhost:9092
    consumer:
      group-id: ${spring.application.name}
      auto-offset-reset: earliest
    producer:
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
```

## 🚀 Chạy Services

### Yêu cầu
1. Khởi động hạ tầng (Eureka, Config Server, Kafka, MongoDB, PostgreSQL)
2. Build các common modules

### Khởi động Service riêng lẻ
```bash
cd services/[ten-service]
mvn spring-boot:run
```

### Khởi động Tất cả Services (Development)
```bash
# Terminal 1 - Auth Service
cd services/auth-service && mvn spring-boot:run

# Terminal 2 - User Service
cd services/user-service && mvn spring-boot:run

# Terminal 3 - Product Service
cd services/product-service && mvn spring-boot:run

# Terminal 4 - Inventory Service
cd services/inventory-service && mvn spring-boot:run

# Terminal 5 - Aggregator Service
cd services/aggregator-service && mvn spring-boot:run
```

### Build Tất cả Services
```bash
# Từ thư mục gốc dự án
mvn clean package -pl services/* -am -DskipTests
```

## 🧪 Kiểm Thử

### Unit Tests
```bash
cd services/[ten-service]
mvn test
```

### Integration Tests
```bash
mvn verify
```

### API Testing
Sử dụng công cụ như:
- **Postman** - Import collection từ `/docs/postman/`
- **cURL** - Testing dòng lệnh
- **HTTPie** - CLI thân thiện với người dùng

## 📊 Giao Tiếp Giữa Services

### Đồng bộ (REST/gRPC)
```
Client → API Gateway → Aggregator Service → [Product/User/Inventory Services]
```

### Bất đồng bộ (Kafka Events)
```
Product Service → Kafka Topic → Inventory Service
Order Service → Kafka Topic → Inventory Service, Notification Service
```

## 🔐 Bảo Mật

### Luồng Xác Thực
```
1. Client → Auth Service (Đăng nhập)
2. Auth Service → JWT Token
3. Client → API Gateway (với JWT)
4. API Gateway → Xác thực Token
5. API Gateway → Chuyển tiếp đến Service
```

### Phân Quyền
- **ADMIN**: Truy cập đầy đủ tất cả các thao tác
- **SELLER**: Có thể quản lý sản phẩm của riêng mình
- **USER**: Có thể xem sản phẩm, quản lý hồ sơ, đặt hàng

## 📈 Giám Sát

### Health Checks (Kiểm tra Sức khỏe)
Mỗi service cung cấp:
```
GET /actuator/health  - Kiểm tra sức khỏe
GET /actuator/info    - Thông tin service
```

### Eureka Dashboard
Xem tất cả services đã đăng ký:
```
http://localhost:8761
```

### Metrics (Chỉ số)
```
GET /actuator/metrics      - Các chỉ số
GET /actuator/prometheus   - Metrics Prometheus
```

## 🐛 Debug

### Các Vấn Đề Thường Gặp

1. **Service không đăng ký với Eureka**
   - Kiểm tra Eureka server đang chạy
   - Xác minh `eureka.client.serviceUrl.defaultZone`
   - Kiểm tra kết nối mạng

2. **Lỗi kết nối Database**
   - Xác minh database đang chạy
   - Kiểm tra thông tin đăng nhập
   - Xác minh URL kết nối

3. **Vấn đề kết nối Kafka**
   - Đảm bảo Kafka và Zookeeper đang chạy
   - Kiểm tra cấu hình `bootstrap-servers`
   - Xác minh topic đã tồn tại

### Logs
```bash
# Xem logs service
tail -f logs/[ten-service].log

# Xem với Maven
mvn spring-boot:run | tee logs/output.log
```

## 📝 Best Practices (Thực Hành Tốt)

1. **Versioning**: Sử dụng versioning API (`/api/v1/...`)
2. **Xử lý Lỗi**: Trả về responses lỗi nhất quán
3. **Logging**: Sử dụng structured logging với correlation IDs
4. **Validation**: Validate input ở API boundaries
5. **Documentation**: Cập nhật tài liệu API thường xuyên
6. **Testing**: Duy trì độ phủ test cao
7. **Monitoring**: Thêm metrics cho các thao tác quan trọng
8. **Security**: Không bao giờ log dữ liệu nhạy cảm

## 🔄 Quy Trình Phát Triển

1. Tạo feature branch
2. Triển khai thay đổi trong service
3. Viết/cập nhật tests
4. Chạy tests locally
5. Build và chạy service
6. Test tích hợp với các services khác
7. Tạo pull request
8. Code review
9. Merge vào main

## 📚 Tài Liệu Bổ Sung

- [Tài liệu Spring Boot](https://spring.io/projects/spring-boot)
- [Tài liệu Spring Cloud](https://spring.io/projects/spring-cloud)
- [Tài liệu MongoDB](https://docs.mongodb.com/)
- [Tài liệu Apache Kafka](https://kafka.apache.org/documentation/)
- [Tài liệu gRPC](https://grpc.io/docs/)

## 🤝 Đóng Góp

Khi tạo service mới:

1. Tuân theo cấu trúc dự án hiện có
2. Thêm service vào parent `pom.xml`
3. Cấu hình Eureka client
4. Thêm health checks
5. Document endpoints trong README này
6. Thêm integration tests
7. Cập nhật sơ đồ kiến trúc

---

**Lưu ý**: Đảm bảo tất cả các dịch vụ hạ tầng (Eureka, Config Server, Kafka, databases) đang chạy trước khi khởi động microservices.

