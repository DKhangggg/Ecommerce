# Nền Tảng E-Commerce Microservices

Một nền tảng thương mại điện tử hiện đại, full-stack được xây dựng với kiến trúc microservices, có backend Spring Boot và frontend Next.js.

## 🏗️ Kiến Trúc

Dự án này tuân theo mô hình kiến trúc microservices với các thành phần sau:

- **Backend Services**: Microservices Spring Boot với service discovery và API Gateway
- **Frontend**: Next.js 16 với TypeScript và Tailwind CSS
- **Hạ tầng**: Docker, Kafka, MongoDB, PostgreSQL, Keycloak
- **Giao tiếp**: REST APIs, gRPC, Kafka event streaming

## 🚀 Công Nghệ Sử Dụng

### Backend
- **Java 21** - Phiên bản Java hiện đại với các tính năng mới nhất
- **Spring Boot 3.5.4** - Framework chính cho microservices
- **Spring Cloud 2025.0.0** - Service discovery, API Gateway, Config Server
- **Spring Data MongoDB** - Database NoSQL cho sản phẩm
- **Spring Data JPA** - Database quan hệ cho người dùng
- **Spring Kafka** - Kiến trúc hướng sự kiện
- **gRPC 1.72.0** - Framework RPC hiệu suất cao
- **Protocol Buffers 4.30.2** - Tuần tự hóa dữ liệu
- **Keycloak** - Quản lý định danh và truy cập
- **JWT (jjwt 0.11.5)** - Xác thực dựa trên token
- **Maven** - Quản lý build và dependency
- **Lombok** - Tự động sinh code

### Frontend
- **Next.js 16** - Framework React với App Router
- **TypeScript** - JavaScript có kiểu dữ liệu an toàn
- **React 19** - Các tính năng React mới nhất
- **Tailwind CSS** - Framework CSS utility-first
- **Radix UI** - Các component UI headless
- **Lucide React** - Thư viện icon
- **Embla Carousel** - Component carousel
- **ShadcN/UI** - Thư viện UI component

### Hạ Tầng
- **Docker & Docker Compose** - Containerization
- **MongoDB** - Database document cho sản phẩm
- **PostgreSQL** - Database quan hệ cho người dùng
- **Apache Kafka** - Message broker cho event streaming
- **Netflix Eureka** - Service discovery
- **Spring Cloud Gateway** - API Gateway
- **Spring Cloud Config** - Cấu hình tập trung

## 📁 Cấu Trúc Dự Án

```
Ecommerce/
├── common/                     # Thư viện dùng chung và DTOs
│   ├── common-data/           # Models và DTOs dùng chung
│   └── proto-contract/        # Định nghĩa gRPC protocol
│
├── config/                    # Cấu hình hạ tầng
│   ├── api-gateway/          # Spring Cloud Gateway
│   ├── config-server/        # Spring Cloud Config Server
│   ├── discovery-server/     # Eureka Service Discovery
│   └── keycloak-docker/      # Thiết lập Keycloak IAM
│
├── services/                  # Các microservices
│   ├── auth-service/         # Xác thực & Phân quyền
│   ├── user-service/         # Quản lý người dùng
│   ├── product-service/      # Danh mục sản phẩm
│   ├── inventory-service/    # Quản lý kho hàng
│   └── aggregator-service/   # Tầng tổng hợp dữ liệu
│
└── frontend/                  # Ứng dụng Frontend
    └── web-client/           # Ứng dụng web Next.js
```

## 🔧 Yêu Cầu Hệ Thống

- **Java 21** trở lên
- **Maven 3.8+**
- **Node.js 18+** và npm/yarn
- **Docker** và **Docker Compose**
- **MongoDB**
- **PostgreSQL**
- **Apache Kafka**

## 🚀 Bắt Đầu

### 1. Clone repository
```bash
git clone <repository-url>
cd Ecommerce
```

### 2. Khởi động các dịch vụ hạ tầng
```bash
cd config
docker-compose up -d
```

Lệnh này sẽ khởi động:
- MongoDB
- PostgreSQL
- Kafka & Zookeeper
- Keycloak

### 3. Build các module chung
```bash
mvn clean install -pl common/common-data,common/proto-contract -am
```

### 4. Khởi động các dịch vụ cấu hình
```bash
# Khởi động Discovery Server (Eureka)
cd config/discovery-server
mvn spring-boot:run

# Khởi động Config Server
cd config/config-server
mvn spring-boot:run

# Khởi động API Gateway
cd config/api-gateway
mvn spring-boot:run
```

### 5. Khởi động các Microservices
```bash
# Auth Service - Dịch vụ xác thực
cd services/auth-service
mvn spring-boot:run

# User Service - Dịch vụ người dùng
cd services/user-service
mvn spring-boot:run

# Product Service - Dịch vụ sản phẩm
cd services/product-service
mvn spring-boot:run

# Inventory Service - Dịch vụ kho hàng
cd services/inventory-service
mvn spring-boot:run

# Aggregator Service - Dịch vụ tổng hợp
cd services/aggregator-service
mvn spring-boot:run
```

### 6. Khởi động Frontend
```bash
cd frontend/web-client
npm install
npm run dev
```

Ứng dụng sẽ chạy tại:
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761

## 📚 Tài Liệu

- [Tài liệu Module Chung](./common/README.vi.md)
- [Tài liệu Services](./services/README.vi.md)

## 🔑 Tính Năng Chính

- **Kiến trúc Microservices**: Phân tách service có khả năng mở rộng và dễ bảo trì
- **Service Discovery**: Tự động đăng ký service với Eureka
- **API Gateway**: Định tuyến tập trung và cân bằng tải
- **Hướng sự kiện**: Giao tiếp bất đồng bộ qua Kafka
- **Hỗ trợ gRPC**: Giao tiếp giữa các service hiệu suất cao
- **Xác thực**: Bảo mật JWT với Keycloak
- **Database riêng cho từng Service**: MongoDB cho sản phẩm, PostgreSQL cho người dùng
- **Giao diện Responsive**: Giao diện hiện đại, thân thiện với mobile
- **Type Safety**: Hỗ trợ TypeScript đầy đủ ở frontend

## 🧪 Kiểm Thử

```bash
# Chạy tất cả tests
mvn test

# Chạy tests cho service cụ thể
cd services/product-service
mvn test
```

## 📦 Build cho Production

```bash
# Build tất cả services
mvn clean package -DskipTests

# Build frontend
cd frontend/web-client
npm run build
```

## 🛠️ Quy Trình Phát Triển

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/tinh-nang-moi`)
3. Commit thay đổi (`git commit -m 'Thêm tính năng mới'`)
4. Push lên branch (`git push origin feature/tinh-nang-moi`)
5. Tạo Pull Request

## 🔍 Cấu Trúc Chi Tiết

### Services (Dịch vụ)
Chứa tất cả các microservices của hệ thống:
- **auth-service** (Port 8081): Xác thực và phân quyền
- **user-service** (Port 8082): Quản lý thông tin người dùng
- **product-service** (Port 8083): Quản lý sản phẩm và danh mục
- **inventory-service** (Port 8084): Quản lý tồn kho
- **aggregator-service** (Port 8085): Tổng hợp dữ liệu từ nhiều service

### Common (Thư viện chung)
Chứa các thành phần được chia sẻ giữa các services:
- **common-data**: DTOs, exceptions, utilities
- **proto-contract**: Định nghĩa gRPC protocol buffers

### Config (Cấu hình)
Chứa các service cấu hình và hạ tầng:
- **api-gateway**: Cổng API chính
- **config-server**: Server cấu hình tập trung
- **discovery-server**: Eureka service registry
- **keycloak-docker**: Cấu hình Keycloak

### Frontend
Ứng dụng web cho khách hàng được xây dựng với Next.js

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
- **ADMIN**: Truy cập đầy đủ tất cả chức năng
- **SELLER**: Quản lý sản phẩm của riêng mình
- **USER**: Xem sản phẩm, quản lý hồ sơ, đặt hàng

## 📈 Giám Sát

### Health Checks
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

## 🐛 Xử Lý Lỗi Thường Gặp

### 1. Service không đăng ký với Eureka
- Kiểm tra Eureka server đang chạy
- Xác minh cấu hình `eureka.client.serviceUrl.defaultZone`
- Kiểm tra kết nối mạng

### 2. Lỗi kết nối Database
- Xác minh database đang chạy
- Kiểm tra thông tin đăng nhập
- Xác minh URL kết nối

### 3. Lỗi kết nối Kafka
- Đảm bảo Kafka và Zookeeper đang chạy
- Kiểm tra cấu hình `bootstrap-servers`
- Xác minh topic đã tồn tại

## 📝 Best Practices

1. **Versioning**: Sử dụng phiên bản API (`/api/v1/...`)
2. **Xử lý lỗi**: Trả về response lỗi nhất quán
3. **Logging**: Sử dụng structured logging với correlation IDs
4. **Validation**: Validate input ở API boundaries
5. **Documentation**: Cập nhật tài liệu API thường xuyên
6. **Testing**: Duy trì độ phủ test cao
7. **Monitoring**: Thêm metrics cho các thao tác quan trọng
8. **Security**: Không bao giờ log dữ liệu nhạy cảm

## 📄 Giấy Phép

Dự án này được cấp phép theo MIT License.

## 👥 Tác Giả

- Tên của bạn - Phát triển ban đầu

## 🙏 Cảm Ơn

- Spring Boot Team
- Next.js Team
- Tất cả các contributor mã nguồn mở

---

**Lưu ý**: Đảm bảo tất cả các dịch vụ hạ tầng (Eureka, Config Server, Kafka, databases) đang chạy trước khi khởi động microservices.

