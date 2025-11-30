# Microservices

This directory contains all the microservices that make up the e-commerce platform's backend.

## 📁 Structure

```
services/
├── auth-service/         # Authentication & Authorization
├── user-service/         # User Management
├── product-service/      # Product Catalog
├── inventory-service/    # Inventory Management
└── aggregator-service/   # Data Aggregation Layer
```

## 🏗️ Architecture Overview

The platform follows a microservices architecture with the following patterns:

- **Service Discovery**: Netflix Eureka for dynamic service registration
- **API Gateway**: Spring Cloud Gateway for routing and load balancing
- **Event-Driven**: Apache Kafka for asynchronous communication
- **Database Per Service**: Each service has its own database
- **gRPC**: High-performance inter-service communication
- **RESTful APIs**: Client-facing HTTP endpoints

## 📦 Services

### 1. auth-service

**Purpose**: Handle authentication and authorization for the platform.

**Port**: `8081`

**Responsibilities**:
- User authentication (login/logout)
- JWT token generation and validation
- Token refresh mechanism
- Password management
- Integration with Keycloak IAM
- Role-based access control (RBAC)

**Technologies**:
- Spring Boot 3.5.4
- Spring Security
- JWT (jjwt 0.11.5)
- Keycloak Client
- PostgreSQL

**Key Endpoints**:
```
POST   /api/auth/login       - User login
POST   /api/auth/register    - User registration
POST   /api/auth/logout      - User logout
POST   /api/auth/refresh     - Refresh access token
POST   /api/auth/validate    - Validate token
```

**Database**: PostgreSQL
- User credentials
- Refresh tokens
- Session management

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

**Purpose**: Manage user profiles and user-related operations.

**Port**: `8082`

**Responsibilities**:
- User profile management (CRUD)
- User preferences and settings
- Address management
- Order history
- Wishlist management
- User verification
- Account deactivation

**Technologies**:
- Spring Boot 3.5.4
- Spring Data JPA
- PostgreSQL
- Spring Cloud Eureka Client
- gRPC Server

**Key Endpoints**:
```
GET    /api/users/{id}           - Get user by ID
PUT    /api/users/{id}           - Update user profile
DELETE /api/users/{id}           - Delete user
GET    /api/users/{id}/addresses - Get user addresses
POST   /api/users/{id}/addresses - Add new address
GET    /api/users/{id}/wishlist  - Get user wishlist
POST   /api/users/{id}/wishlist  - Add to wishlist
```

**Database**: PostgreSQL
- Users table
- Addresses table
- User preferences
- Wishlist items

**gRPC Services**:
- `UserService` - Internal user queries for other services

**Event Publishing**:
- `UserCreated` - When new user is created
- `UserUpdated` - When user profile is updated
- `UserDeleted` - When user is deleted

---

### 3. product-service

**Purpose**: Manage product catalog and categories.

**Port**: `8083`

**Responsibilities**:
- Product catalog management (CRUD)
- Category management
- Product search and filtering
- Product attributes and specifications
- Product images and media
- Featured products
- Product availability status
- SEO-friendly slugs

**Technologies**:
- Spring Boot 3.5.4
- Spring Data MongoDB
- MongoDB
- Apache Kafka (Producer)
- Spring Cloud Eureka Client

**Key Endpoints**:
```
GET    /api/products              - List all products (with pagination)
GET    /api/products/{id}         - Get product by ID
GET    /api/products/slug/{slug}  - Get product by slug
POST   /api/products              - Create new product (SELLER/ADMIN)
PUT    /api/products/{id}         - Update product (SELLER/ADMIN)
DELETE /api/products/{id}         - Delete product (ADMIN)
GET    /api/products/search       - Search products
GET    /api/products/featured     - Get featured products
GET    /api/categories            - List all categories
POST   /api/categories            - Create category (ADMIN)
```

**Database**: MongoDB
```javascript
// Products Collection
{
  _id: ObjectId,
  name: String,
  slug: String,
  description: String,
  sellerId: String,
  price: Number,
  salePrice: Number,
  primaryCategoryName: String,
  categories: [ObjectId],  // References to Category
  imageUrls: [String],
  attributes: [{
    name: String,
    value: String
  }],
  isFeatured: Boolean,
  isAvailable: Boolean,
  averageRating: Number,
  ratingCount: Number,
  createdAt: ISODate,
  updatedAt: ISODate
}

// Categories Collection
{
  _id: ObjectId,
  name: String,
  description: String,
  status: String,
  products: [String],  // Product IDs
  createdAt: ISODate,
  updatedAt: ISODate
}
```

**Event Publishing**:
- `ProductCreated` - When new product is created
- `ProductUpdated` - When product is updated
- `ProductDeleted` - When product is deleted
- `ProductPriceChanged` - When product price changes

**Features**:
- Full-text search
- Category-based filtering
- Price range filtering
- Attribute-based filtering
- Pagination and sorting
- Image upload support
- Slug generation for SEO

---

### 4. inventory-service

**Purpose**: Manage product inventory and stock levels.

**Port**: `8084`

**Responsibilities**:
- Stock level management
- Inventory tracking
- Stock reservations (for orders)
- Low stock alerts
- Inventory updates
- Stock synchronization
- Warehouse management

**Technologies**:
- Spring Boot 3.5.4
- Spring Data MongoDB
- MongoDB
- Apache Kafka (Consumer/Producer)
- Spring Cloud Eureka Client
- gRPC Server

**Key Endpoints**:
```
GET    /api/inventory/{productId}       - Get inventory for product
PUT    /api/inventory/{productId}       - Update inventory
POST   /api/inventory/reserve           - Reserve stock for order
POST   /api/inventory/release           - Release reserved stock
GET    /api/inventory/low-stock         - Get low stock products
POST   /api/inventory/bulk-update       - Bulk inventory update
```

**Database**: MongoDB
```javascript
{
  _id: ObjectId,
  productId: String,
  availableQuantity: Number,
  reservedQuantity: Number,
  totalQuantity: Number,
  warehouseLocation: String,
  lowStockThreshold: Number,
  lastRestocked: ISODate,
  updatedAt: ISODate
}
```

**Event Consumption**:
- `ProductCreated` - Initialize inventory for new product
- `OrderPlaced` - Reserve stock for order
- `OrderCancelled` - Release reserved stock

**Event Publishing**:
- `StockUpdated` - When stock levels change
- `LowStockAlert` - When stock below threshold
- `OutOfStock` - When product is out of stock

**gRPC Services**:
- `InventoryService` - Check stock availability for other services

---

### 5. aggregator-service

**Purpose**: Aggregate data from multiple services for client consumption.

**Port**: `8085`

**Responsibilities**:
- Combine data from multiple services
- Reduce client-side API calls
- Provide enriched product data
- Homepage data aggregation
- Product details with inventory
- User-specific product recommendations
- Batch operations
- Data caching

**Technologies**:
- Spring Boot 3.5.4
- Spring WebFlux (Reactive)
- gRPC Client
- REST Client (WebClient)
- Redis (for caching)
- Spring Cloud Eureka Client

**Key Endpoints**:
```
GET    /api/aggregate/products/{id}     - Product with inventory and reviews
GET    /api/aggregate/home              - Homepage data (featured products, categories)
GET    /api/aggregate/user/{id}/profile - User profile with orders and wishlist
GET    /api/aggregate/products/search   - Search products with inventory status
GET    /api/aggregate/cart/validate     - Validate cart items with current stock
```

**Service Integration**:
```
Aggregator Service
    ├─> Product Service (REST/gRPC)
    ├─> Inventory Service (gRPC)
    ├─> User Service (gRPC)
    └─> Auth Service (REST)
```

**Data Aggregation Examples**:

1. **Product Details**:
```json
{
  "product": { /* from product-service */ },
  "inventory": { /* from inventory-service */ },
  "seller": { /* from user-service */ }
}
```

2. **Homepage Data**:
```json
{
  "featuredProducts": [ /* with inventory */ ],
  "categories": [ /* from product-service */ ],
  "bestSellers": [ /* aggregated data */ ]
}
```

**Features**:
- Parallel service calls
- Circuit breaker pattern
- Response caching
- Error handling and fallbacks
- Request deduplication

---

## 🔧 Common Patterns

### Service Discovery
All services register with Eureka:

```yaml
eureka:
  client:
    serviceUrl:
      defaultZone: http://localhost:8761/eureka/
  instance:
    preferIpAddress: true
```

### Database Configuration

**MongoDB (Product, Inventory)**:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/database_name
```

**PostgreSQL (User, Auth)**:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/database_name
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
```

### Kafka Configuration
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

## 🚀 Running Services

### Prerequisites
1. Start infrastructure (Eureka, Config Server, Kafka, MongoDB, PostgreSQL)
2. Build common modules

### Start Individual Service
```bash
cd services/[service-name]
mvn spring-boot:run
```

### Start All Services (Development)
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

### Build All Services
```bash
# From project root
mvn clean package -pl services/* -am -DskipTests
```

## 🧪 Testing

### Unit Tests
```bash
cd services/[service-name]
mvn test
```

### Integration Tests
```bash
mvn verify
```

### API Testing
Use tools like:
- **Postman** - Import collection from `/docs/postman/`
- **cURL** - Command-line testing
- **HTTPie** - User-friendly CLI

## 📊 Service Communication

### Synchronous (REST/gRPC)
```
Client → API Gateway → Aggregator Service → [Product/User/Inventory Services]
```

### Asynchronous (Kafka Events)
```
Product Service → Kafka Topic → Inventory Service
Order Service → Kafka Topic → Inventory Service, Notification Service
```

## 🔐 Security

### Authentication Flow
```
1. Client → Auth Service (Login)
2. Auth Service → JWT Token
3. Client → API Gateway (with JWT)
4. API Gateway → Validate Token
5. API Gateway → Forward to Service
```

### Authorization
- **ADMIN**: Full access to all operations
- **SELLER**: Can manage own products
- **USER**: Can view products, manage profile, place orders

## 📈 Monitoring

### Health Checks
Each service exposes:
```
GET /actuator/health
GET /actuator/info
```

### Eureka Dashboard
View all registered services:
```
http://localhost:8761
```

### Metrics
```
GET /actuator/metrics
GET /actuator/prometheus
```

## 🐛 Debugging

### Common Issues

1. **Service not registering with Eureka**
   - Check Eureka server is running
   - Verify `eureka.client.serviceUrl.defaultZone`
   - Check network connectivity

2. **Database connection errors**
   - Verify database is running
   - Check credentials
   - Verify connection URL

3. **Kafka connection issues**
   - Ensure Kafka and Zookeeper are running
   - Check `bootstrap-servers` configuration
   - Verify topic exists

### Logs
```bash
# View service logs
tail -f logs/[service-name].log

# View with Maven
mvn spring-boot:run | tee logs/output.log
```

## 📝 Best Practices

1. **Versioning**: Use API versioning (`/api/v1/...`)
2. **Error Handling**: Return consistent error responses
3. **Logging**: Use structured logging with correlation IDs
4. **Validation**: Validate input at API boundaries
5. **Documentation**: Keep API documentation updated
6. **Testing**: Maintain high test coverage
7. **Monitoring**: Add metrics for critical operations
8. **Security**: Never log sensitive data

## 🔄 Development Workflow

1. Create feature branch
2. Implement changes in service
3. Write/update tests
4. Run tests locally
5. Build and run service
6. Test integration with other services
7. Create pull request
8. Code review
9. Merge to main

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [gRPC Documentation](https://grpc.io/docs/)

## 🤝 Contributing

When creating a new service:

1. Follow the existing project structure
2. Add service to parent `pom.xml`
3. Configure Eureka client
4. Add health checks
5. Document endpoints in this README
6. Add integration tests
7. Update architecture diagrams

---

**Note**: Ensure all infrastructure services (Eureka, Config Server, Kafka, databases) are running before starting microservices.

