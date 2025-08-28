package com.em.authservice.service;

import com.em.authservice.model.CustomAccountDetail;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpiration;

    public String generateToken(UserDetails accountDetail) {
        return buildToken(accountDetail, EXPIRATION_TIME);
    }

    public String generateRefreshToken(UserDetails accountDetail) {
        return buildToken(accountDetail, refreshExpiration);
    }

    private String buildToken(UserDetails userDetails, long expirationTime) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof CustomAccountDetail customAccountDetail) {
            claims.put("roles", customAccountDetail.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList());
            claims.put("id", customAccountDetail.getAccount().getId().toString());
        }

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            String username = extractUsername(token);
            if (username == null || username.isEmpty()) {
                return false;
            }
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }
}
