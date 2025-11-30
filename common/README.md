# Common Modules

This directory contains shared libraries and common components used across all microservices in the e-commerce platform.

## 📁 Structure

```
common/
├── common-data/        # Shared data models, DTOs, and utilities
└── proto-contract/     # gRPC protocol buffer definitions
```

## 📦 Modules

### 1. common-data

Shared data transfer objects (DTOs), domain models, exceptions, and utility classes used by multiple microservices.

#### Purpose
- Provide consistent data structures across services
- Share common business logic and validation rules
- Centralize exception handling
- Define common specifications and utilities

#### Contents

**DTOs (Data Transfer Objects)**
- `dto/product/` - Product-related DTOs
  - `ProductResponse` - Standard product response format
  - `ProductRequest` - Product creation/update request
  - `CategoryResponse` - Category response format
  - `AttributeDto` - Product attributes
  
- `dto/user/` - User-related DTOs
  - `UserResponse` - User information response
  - `UserRequest` - User creation/update request
  
- `dto/auth/` - Authentication DTOs
  - `LoginRequest` - Login credentials
  - `RegisterRequest` - User registration
  - `TokenResponse` - JWT token response

**Exception Classes**
- `exception/` - Common exception definitions
  - `ResourceNotFoundException` - Entity not found
  - `UnauthorizedException` - Authentication failures
  - `ValidationException` - Data validation errors
  - `BusinessException` - Business rule violations

**Domain Models**
- `model/` - Shared domain entities
  - Base entities
  - Common value objects
  - Enum definitions

**Repositories**
- `repository/` - Common repository interfaces
  - Base repository patterns
  - Custom query methods

**Specifications**
- `specification/` - JPA Specifications for complex queries
  - Dynamic query builders
  - Filtering and sorting utilities

**Utilities**
- `util/` - Helper classes and utilities
  - Date/Time utilities
  - String manipulation
  - Validation helpers
  - Mapping utilities

#### Dependencies
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

#### Usage in Services

Add this dependency to your service's `pom.xml`:

```xml
<dependency>
    <groupId>com.em</groupId>
    <artifactId>common-data</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Example - Using ProductResponse:**
```java
import com.em.common.dto.product.ProductResponse;
import com.em.common.dto.product.AttributeDto;

ProductResponse response = ProductResponse.builder()
    .id("123")
    .name("Product Name")
    .price(99.99)
    .attributes(List.of(
        new AttributeDto("Color", "Red"),
        new AttributeDto("Size", "Large")
    ))
    .build();
```

**Example - Using Custom Exceptions:**
```java
import com.em.common.exception.ResourceNotFoundException;

public Product getProduct(String id) {
    return productRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
}
```

### 2. proto-contract

Protocol Buffer definitions for gRPC communication between microservices.

#### Purpose
- Define service contracts for inter-service communication
- Enable type-safe, high-performance RPC calls
- Support polyglot service development
- Provide backward compatibility through versioning

#### Contents

**Protocol Buffer Files**
- `src/main/proto/` - .proto definition files
  - `user.proto` - User service contracts
  - `product.proto` - Product service contracts
  - `inventory.proto` - Inventory service contracts
  - `common.proto` - Shared message types

**Generated Code**
- `target/generated-sources/` - Auto-generated Java classes
  - Service stubs
  - Request/Response messages
  - gRPC client/server code

#### Technologies
- **Protocol Buffers 4.30.2** - Data serialization format
- **gRPC 1.72.0** - RPC framework
- **gRPC Spring Boot Starter 2.15.0** - Spring integration

#### Dependencies
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

#### Usage in Services

Add this dependency to your service's `pom.xml`:

```xml
<dependency>
    <groupId>com.em</groupId>
    <artifactId>proto-contract</artifactId>
    <version>1.0.0</version>
</dependency>
```

**Example - gRPC Server:**
```java
import net.devh.boot.grpc.server.service.GrpcService;

@GrpcService
public class UserGrpcService extends UserServiceGrpc.UserServiceImplBase {
    @Override
    public void getUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        // Implementation
    }
}
```

**Example - gRPC Client:**
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

## 🔨 Building Common Modules

Build all common modules before building any service:

```bash
# From project root
mvn clean install -pl common/common-data,common/proto-contract -am

# Or build individually
cd common/common-data
mvn clean install

cd common/proto-contract
mvn clean install
```

## 📝 Best Practices

### 1. Versioning
- Use semantic versioning for common modules
- Update version in parent POM when making changes
- Maintain backward compatibility when possible

### 2. DTOs
- Keep DTOs immutable when possible (use `@Builder` with `@Value`)
- Add validation annotations (`@NotNull`, `@Size`, etc.)
- Document all fields with JavaDoc
- Use appropriate data types (BigDecimal for money, LocalDateTime for timestamps)

### 3. Exceptions
- Create specific exception classes for different error scenarios
- Include meaningful error messages
- Add error codes for client handling
- Extend from appropriate base exceptions

### 4. Protocol Buffers
- Use semantic versioning for .proto files
- Never remove or renumber fields
- Use reserved keywords for deprecated fields
- Add comments to all messages and fields
- Group related messages in the same file

### 5. Dependencies
- Minimize external dependencies in common modules
- Only include essential, stable libraries
- Avoid circular dependencies
- Keep dependency versions consistent with parent POM

## 🔄 Update Workflow

When updating common modules:

1. Make changes in the common module
2. Update version if needed
3. Build and install: `mvn clean install`
4. Update version in dependent services
5. Test all affected services
6. Commit changes

## 🧪 Testing

```bash
# Run tests for common-data
cd common/common-data
mvn test

# Run tests for proto-contract
cd common/proto-contract
mvn test
```

## 📊 Module Dependencies

```
Services (auth, user, product, inventory, aggregator)
    ↓
common-data (DTOs, Exceptions, Utils)
    ↓
Spring Boot Dependencies

Services (with gRPC)
    ↓
proto-contract (gRPC definitions)
    ↓
gRPC + Protocol Buffers
```

## ⚠️ Important Notes

- **Build Order**: Always build common modules before services
- **Version Sync**: Keep versions synchronized across all services
- **Breaking Changes**: Coordinate updates when making breaking changes
- **Documentation**: Update this README when adding new modules or features
- **Testing**: Add unit tests for all utilities and validators

## 🤝 Contributing

When adding new common code:

1. Consider if it's truly shared across multiple services
2. Add appropriate documentation
3. Include unit tests
4. Update this README
5. Version appropriately
6. Test with all dependent services

## 📚 Related Documentation

- [Parent POM](../pom.xml)
- [Services Documentation](../services/README.md)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [gRPC Documentation](https://grpc.io/docs/)
- [Protocol Buffers Guide](https://protobuf.dev/)

