package com.em.aggregatorservice.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private String message;
    private int status;
    private T data;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime timestamp;

    public static <T> ApiResponseBuilder<T> success() {
        return ApiResponse.<T>builder()
                .status(200)
                .timestamp(LocalDateTime.now());
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
                .status(200)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponseBuilder<T> created() {
        return ApiResponse.<T>builder()
                .status(201)
                .timestamp(LocalDateTime.now());
    }

    public static <T> ApiResponse<T> created(String message, T data) {
        return ApiResponse.<T>builder()
                .status(201)
                .message(message)
                .data(data)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> accepted(String message) {
        return ApiResponse.<T>builder()
                .status(202)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> noContent() {
        return ApiResponse.<T>builder()
                .status(204)
                .message("No content")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponseBuilder<T> error(int statusCode) {
        return ApiResponse.<T>builder()
                .status(statusCode)
                .timestamp(LocalDateTime.now());
    }

    public static <T> ApiResponse<T> badRequest(String message) {
        return ApiResponse.<T>builder()
                .status(400)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> unauthorized(String message) {
        return ApiResponse.<T>builder()
                .status(401)
                .message(message != null ? message : "Unauthorized")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> forbidden(String message) {
        return ApiResponse.<T>builder()
                .status(403)
                .message(message != null ? message : "Forbidden")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> notFound(String message) {
        return ApiResponse.<T>builder()
                .status(404)
                .message(message != null ? message : "Not found")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> conflict(String message) {
        return ApiResponse.<T>builder()
                .status(409)
                .message(message)
                .timestamp(LocalDateTime.now())
                .build();
    }

    public static <T> ApiResponse<T> internalServerError(String message) {
        return ApiResponse.<T>builder()
                .status(500)
                .message(message != null ? message : "Internal server error")
                .timestamp(LocalDateTime.now())
                .build();
    }

    public boolean isSuccess() {
        return status >= 200 && status < 300;
    }

    public boolean isError() {
        return status >= 400;
    }

    public boolean isClientError() {
        return status >= 400 && status < 500;
    }

    public boolean isServerError() {
        return status >= 500;
    }
}

