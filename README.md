# E-Commerce Microservices Platform

A modern, full-stack e-commerce platform built with microservices architecture, featuring a Spring Boot backend and Next.js frontend.

## 🏗️ Architecture

This project follows a microservices architecture pattern with the following components:

- **Backend Services**: Spring Boot microservices with service discovery and API Gateway
- **Frontend**: Next.js 16 with TypeScript and Tailwind CSS
- **Infrastructure**: Docker, Kafka, MongoDB, PostgreSQL, Keycloak
- **Communication**: REST APIs, gRPC, Kafka event streaming

## 🚀 Tech Stack

### Backend
- **Java 21** - Modern Java with latest features
- **Spring Boot 3.5.4** - Core framework for microservices
- **Spring Cloud 2025.0.0** - Service discovery, API Gateway, Config Server
- **Spring Data MongoDB** - NoSQL database for products
- **Spring Data JPA** - Relational database for users
- **Spring Kafka** - Event-driven architecture
- **gRPC 1.72.0** - High-performance RPC framework
- **Protocol Buffers 4.30.2** - Data serialization
- **Keycloak** - Identity and Access Management
- **JWT (jjwt 0.11.5)** - Token-based authentication
- **Maven** - Build and dependency management
- **Lombok** - Code generation

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 19** - Latest React features
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel component
- **ShadcN/UI** - UI component library

### Infrastructure
- **Docker & Docker Compose** - Containerization
- **MongoDB** - Document database for products
- **PostgreSQL** - Relational database for users
- **Apache Kafka** - Message broker for event streaming
- **Netflix Eureka** - Service discovery
- **Spring Cloud Gateway** - API Gateway
- **Spring Cloud Config** - Centralized configuration

## 📁 Project Structure

```
Ecommerce/
├── common/                     # Shared libraries and DTOs
│   ├── common-data/           # Common data models and DTOs
│   └── proto-contract/        # gRPC protocol definitions
│
├── config/                    # Infrastructure configuration
│   ├── api-gateway/          # Spring Cloud Gateway
│   ├── config-server/        # Spring Cloud Config Server
│   ├── discovery-server/     # Eureka Service Discovery
│   └── keycloak-docker/      # Keycloak IAM setup
│
├── services/                  # Microservices
│   ├── auth-service/         # Authentication & Authorization
│   ├── user-service/         # User management
│   ├── product-service/      # Product catalog
│   ├── inventory-service/    # Inventory management
│   └── aggregator-service/   # Data aggregation layer
│
└── frontend/                  # Frontend applications
    └── web-client/           # Next.js customer web app
```

## 🔧 Prerequisites

- **Java 21** or higher
- **Maven 3.8+**
- **Node.js 18+** and npm/yarn
- **Docker** and **Docker Compose**
- **MongoDB**
- **PostgreSQL**
- **Apache Kafka**

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Ecommerce
```

### 2. Start Infrastructure Services
```bash
cd config
docker-compose up -d
```

This will start:
- MongoDB
- PostgreSQL
- Kafka & Zookeeper
- Keycloak

### 3. Build Common Modules
```bash
mvn clean install -pl common/common-data,common/proto-contract -am
```

### 4. Start Configuration Services
```bash
# Start Discovery Server (Eureka)
cd config/discovery-server
mvn spring-boot:run

# Start Config Server
cd config/config-server
mvn spring-boot:run

# Start API Gateway
cd config/api-gateway
mvn spring-boot:run
```

### 5. Start Microservices
```bash
# Auth Service
cd services/auth-service
mvn spring-boot:run

# User Service
cd services/user-service
mvn spring-boot:run

# Product Service
cd services/product-service
mvn spring-boot:run

# Inventory Service
cd services/inventory-service
mvn spring-boot:run

# Aggregator Service
cd services/aggregator-service
mvn spring-boot:run
```

### 6. Start Frontend
```bash
cd frontend/web-client
npm install
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8080
- **Eureka Dashboard**: http://localhost:8761

## 📚 Documentation

- [Common Modules Documentation](./common/README.md)
- [Services Documentation](./services/README.md)

## 🔑 Key Features

- **Microservices Architecture**: Scalable and maintainable service separation
- **Service Discovery**: Automatic service registration with Eureka
- **API Gateway**: Centralized routing and load balancing
- **Event-Driven**: Asynchronous communication via Kafka
- **gRPC Support**: High-performance inter-service communication
- **Authentication**: Secure JWT-based auth with Keycloak
- **Database Per Service**: MongoDB for products, PostgreSQL for users
- **Responsive UI**: Modern, mobile-friendly interface
- **Type Safety**: Full TypeScript support in frontend

## 🧪 Testing

```bash
# Run all tests
mvn test

# Run specific service tests
cd services/product-service
mvn test
```

## 📦 Building for Production

```bash
# Build all services
mvn clean package -DskipTests

# Build frontend
cd frontend/web-client
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Spring Boot Team
- Next.js Team
- All open-source contributors

