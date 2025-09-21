package com.em.apigateway.Config;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;
import java.util.Map;


@Component
public class GFilter implements GlobalFilter {

    private JwtUtil jwtService;

    public GFilter(JwtUtil jwtService) {
        this.jwtService = jwtService;
    }


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        Route route = exchange.getAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        if(route == null) return chain.filter(exchange);
        Map<String ,Object> mD = route.getMetadata();
        String auth = mD == null ?"public":(String)mD.getOrDefault("auth","public");
        if("private".equalsIgnoreCase(auth)){
            String Header = exchange.getRequest().getHeaders().getFirst("Authorization");
            if(Header==null || !Header.startsWith("Bearer ")){
                return unauthorized(exchange,"Missing or invalid Authorization header");
            }
            String token = Header.substring(7);
            if (!jwtService.validateToken(token)) {
                return unauthorized(exchange, "Invalid or expired token");
            }


            String userId = jwtService.getClaims(token).getSubject();
            exchange = exchange.mutate()
                    .request(exchange.getRequest().mutate()
                            .header("X-User-Id", userId)
                            .build())
                    .build();
        }
        return chain.filter(exchange);
        }

    private Mono<Void> unauthorized(ServerWebExchange exchange,String msg) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        DataBuffer buf = exchange.getResponse().bufferFactory().wrap(msg.getBytes(StandardCharsets.UTF_8));
        return exchange.getResponse().writeWith(Mono.just(buf));
    }
}

