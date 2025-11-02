package com.em.apigateway.Config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Component
public class GFilter implements GlobalFilter, Ordered {

    private static final Logger log = LoggerFactory.getLogger(GFilter.class);
    private final JwtUtil jwtService;

    public GFilter(JwtUtil jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getURI().getPath();

        log.info("Global filter invoked for path: {}", path);

        if (path.startsWith("/api/public/")) {
            log.info("Path is PUBLIC, skipping token check for: {}", path);
            return chain.filter(exchange);
        }

        log.info("Path is PRIVATE, checking token for: {}", path);

        String authHeader = request.getHeaders().getFirst("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            log.warn("Missing or invalid Authorization header for path: {}", path);
            return unauthorized(exchange, "Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);

        try {
            if (!jwtService.validateToken(token)) {
                log.warn("Invalid or expired token");
                return unauthorized(exchange, "Invalid or expired token");
            }

            String userId = jwtService.getClaims(token).get("id", String.class);
            List<String> roles = jwtService.getClaims(token).get("roles", List.class);

            if (userId == null || roles == null) {
                log.warn("Token is missing required claims (id or roles)");
                return unauthorized(exchange, "Token missing required claims");
            }

            log.info("Successfully validated token. User: {}, Roles: {}", userId, roles);

            ServerHttpRequest modifiedRequest = request.mutate()
                    .header("X-User-Id", userId)
                    .header("X-Roles", String.join(",", roles))
                    .build();

            return chain.filter(exchange.mutate().request(modifiedRequest).build());

        } catch (Exception e) {
            log.error("Token validation error: {}", e.getMessage());
            return unauthorized(exchange, "Token validation error: " + e.getMessage());
        }
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange, String msg) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBuffer buf = exchange.getResponse().bufferFactory().wrap(msg.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buf));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}