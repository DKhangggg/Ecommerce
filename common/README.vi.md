# Các Module Chung

Thư mục này chứa các thư viện chia sẻ và các component chung được sử dụng trong tất cả các microservices của nền tảng thương mại điện tử.

## 📁 Cấu Trúc

```
common/
├── common-data/        # Models dữ liệu chung, DTOs, và utilities
└── proto-contract/     # Định nghĩa gRPC protocol buffer
```

## 📦 Các Module

### 1. common-data

Các đối tượng truyền dữ liệu (DTOs), domain models, exceptions, và các utility classes được nhiều microservices sử dụng.

#### Mục Đích
- Cung cấp cấu trúc dữ liệu nhất quán giữa các services
- Chia sẻ logic nghiệp vụ và quy tắc validation chung
- Tập trung xử lý exception
- Định nghĩa các specifications và utilities chung

#### Nội Dung

**DTOs (Data Transfer Objects)**
- `dto/product/` - DTOs liên quan đến sản phẩm
  - `ProductResponse` - Format response sản phẩm chuẩn
  - `ProductRequest` - Request tạo/cập nhật sản phẩm
  - `CategoryResponse` - Format response danh mục
  - `AttributeDto` - Thuộc tính sản phẩm
  
- `dto/user/` - DTOs liên quan đến người dùng
  - `UserResponse` - Response thông tin người dùng
  - `UserRequest` - Request tạo/cập nhật người dùng
  
- `dto/auth/` - DTOs xác thực
  - `LoginRequest` - Thông tin đăng nhập
  - `RegisterRequest` - Đăng ký người dùng
  - `TokenResponse` - Response JWT token

**Exception Classes (Các lớp ngoại lệ)**
- `exception/` - Định nghĩa exception chung
  - `ResourceNotFoundException` - Không tìm thấy entity
  - `UnauthorizedException` - Lỗi xác thực
  - `ValidationException` - Lỗi validation dữ liệu
  - `BusinessException` - Vi phạm quy tắc nghiệp vụ

**Domain Models (Models miền)**
- `model/` - Các entity miền được chia sẻ
  - Base entities
  - Value objects chung
  - Định nghĩa Enum

**Repositories (Kho dữ liệu)**
- `repository/` - Interfaces repository chung
  - Patterns repository cơ bản
  - Phương thức query tùy chỉnh

**Specifications (Đặc tả)**
- `specification/` - JPA Specifications cho các query phức tạp
  - Query builders động
  - Utilities lọc và sắp xếp

**Utilities (Tiện ích)**
- `util/` - Các helper classes và utilities
  - Utilities Date/Time
  - Xử lý chuỗi
  - Helpers validation
  - Utilities mapping

#### Dependencies (Phụ thuộc)
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```

#### Sử Dụng Trong Services

Thêm dependency này vào `pom.xml` của service:

```xml
<dependency>
    <groupId>com.em</groupId>
    <artifactId>common-data</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Ví dụ - Sử dụng ProductResponse:**
```java
import com.em.common.dto.product.ProductResponse;
import com.em.common.dto.product.AttributeDto;

ProductResponse response = ProductResponse.builder()
    .id("123")
    .name("Tên sản phẩm")
    .price(99.99)
    .attributes(List.of(
        new AttributeDto("Màu sắc", "Đỏ"),
        new AttributeDto("Kích thước", "Lớn")
    ))
    .build();
```

**Ví dụ - Sử dụng Custom Exceptions:**
```java
import com.em.common.exception.ResourceNotFoundException;

public Product getProduct(String id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với id: " + id));
}
```

### 2. proto-contract

Định nghĩa Protocol Buffer cho giao tiếp gRPC giữa các microservices.

#### Mục Đích
- Định nghĩa service contracts cho giao tiếp giữa các services
- Cho phép RPC calls type-safe, hiệu suất cao
- Hỗ trợ phát triển service đa ngôn ngữ
- Cung cấp khả năng tương thích ngược thông qua versioning

#### Nội Dung

**Protocol Buffer Files (Files Protocol Buffer)**
- `src/main/proto/` - Files định nghĩa .proto
  - `user.proto` - Contracts service người dùng
  - `product.proto` - Contracts service sản phẩm
  - `inventory.proto` - Contracts service kho hàng
  - `common.proto` - Các message types chia sẻ

**Generated Code (Code được sinh tự động)**
- `target/generated-sources/` - Các class Java được tạo tự động
  - Service stubs
  - Request/Response messages
  - Code gRPC client/server

#### Công Nghệ
- **Protocol Buffers 4.30.2** - Format tuần tự hóa dữ liệu
- **gRPC 1.72.0** - Framework RPC
- **gRPC Spring Boot Starter 2.15.0** - Tích hợp Spring

#### Dependencies (Phụ thuộc)
```xml
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-stub</artifactId>
</dependency>
<dependency>
    <groupId>io.grpc</groupId>
    <artifactId>grpc-protobuf</artifactId>
</dependency>
<dependency>
    <groupId>com.google.protobuf</groupId>
    <artifactId>protobuf-java</artifactId>
</dependency>
```

#### Build Plugin
```xml
<plugin>
    <groupId>org.xolstice.maven.plugins</groupId>
    <artifactId>protobuf-maven-plugin</artifactId>
    <version>0.6.1</version>
    <configuration>
        <protocArtifact>com.google.protobuf:protoc:${protobuf.version}:exe:${os.detected.classifier}</protocArtifact>
        <pluginId>grpc-java</pluginId>
        <pluginArtifact>io.grpc:protoc-gen-grpc-java:${grpc.version}:exe:${os.detected.classifier}</pluginArtifact>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>compile</goal>
                <goal>compile-custom</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### Sử Dụng Trong Services

Thêm dependency này vào `pom.xml` của service:

```xml
<dependency>
    <groupId>com.em</groupId>
    <artifactId>proto-contract</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Ví dụ - gRPC Server:**
```java
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        // Implementation - Triển khai
    }
}
```

**Ví dụ - gRPC Client:**
```java
import net.devh.boot.grpc.client.inject.GrpcClient;

@Service
public class UserClient {
    @GrpcClient("user-service")
    private UserServiceGrpc.UserServiceBlockingStub userStub;
    
    public UserResponse getUser(String userId) {
        return userStub.getUser(UserRequest.newBuilder()
            .setUserId(userId)
            .build());
    }
}
```

## 🔨 Build Các Module Chung

Build tất cả các module chung trước khi build bất kỳ service nào:

```bash
# Từ thư mục gốc dự án
mvn clean install -pl common/common-data,common/proto-contract -am

# Hoặc build riêng lẻ
cd common/common-data
mvn clean install

cd common/proto-contract
mvn clean install
```

## 📝 Best Practices (Thực Hành Tốt)

### 1. Versioning (Quản lý phiên bản)
- Sử dụng semantic versioning cho common modules
- Cập nhật version trong parent POM khi có thay đổi
- Duy trì khả năng tương thích ngược khi có thể

### 2. DTOs
- Giữ DTOs immutable khi có thể (dùng `@Builder` với `@Value`)
- Thêm validation annotations (`@NotNull`, `@Size`, v.v.)
- Document tất cả fields với JavaDoc
- Sử dụng kiểu dữ liệu phù hợp (BigDecimal cho tiền, LocalDateTime cho timestamps)

### 3. Exceptions (Ngoại lệ)
- Tạo exception classes cụ thể cho các tình huống lỗi khác nhau
- Bao gồm thông báo lỗi có ý nghĩa
- Thêm error codes để client xử lý
- Kế thừa từ base exceptions phù hợp

### 4. Protocol Buffers
- Sử dụng semantic versioning cho files .proto
- Không bao giờ xóa hoặc đánh số lại các fields
- Sử dụng từ khóa reserved cho các fields deprecated
- Thêm comments cho tất cả messages và fields
- Nhóm các messages liên quan trong cùng file

### 5. Dependencies (Phụ thuộc)
- Giảm thiểu external dependencies trong common modules
- Chỉ include các thư viện cần thiết, ổn định
- Tránh circular dependencies
- Giữ versions của dependency nhất quán với parent POM

## 🔄 Quy Trình Cập Nhật

Khi cập nhật common modules:

1. Thực hiện thay đổi trong common module
2. Cập nhật version nếu cần
3. Build và install: `mvn clean install`
4. Cập nhật version trong các services phụ thuộc
5. Test tất cả services bị ảnh hưởng
6. Commit thay đổi

## 🧪 Kiểm Thử

```bash
# Chạy tests cho common-data
cd common/common-data
mvn test

# Chạy tests cho proto-contract
cd common/proto-contract
mvn test
```

## 📊 Module Dependencies (Phụ thuộc Module)

```
Services (auth, user, product, inventory, aggregator)
    ↓
common-data (DTOs, Exceptions, Utils)
    ↓
Spring Boot Dependencies

Services (với gRPC)
    ↓
proto-contract (Định nghĩa gRPC)
    ↓
gRPC + Protocol Buffers
```

## ⚠️ Lưu Ý Quan Trọng

- **Thứ tự Build**: Luôn build common modules trước khi build services
- **Đồng bộ Version**: Giữ versions đồng bộ giữa tất cả services
- **Breaking Changes**: Phối hợp cập nhật khi có breaking changes
- **Documentation**: Cập nhật README này khi thêm modules hoặc features mới
- **Testing**: Thêm unit tests cho tất cả utilities và validators

## 🤝 Đóng Góp

Khi thêm code chung mới:

1. Xem xét xem nó có thực sự được chia sẻ giữa nhiều services không
2. Thêm documentation phù hợp
3. Bao gồm unit tests
4. Cập nhật README này
5. Version phù hợp
6. Test với tất cả services phụ thuộc

## 📚 Tài Liệu Liên Quan

- [Parent POM](../pom.xml)
- [Tài liệu Services](../services/README.vi.md)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://protobuf.dev/)

---

**Mẹo**: Khi gặp lỗi compilation liên quan đến common modules, hãy đảm bảo bạn đã build và install chúng vào local Maven repository (`mvn clean install`).

