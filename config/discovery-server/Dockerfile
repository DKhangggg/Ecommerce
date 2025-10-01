FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY target/*.jar discovery-server.jar
EXPOSE 8761
ENTRYPOINT ["java","-jar","discovery-server.jar"]
