package com.em.authservice.service;

import com.em.authservice.model.CustomAccountDetail;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.security.Key;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {

    private final String SECRET_KEY = "super-secret-key-123456";
    private final long EXPIRATION_TIME = 864_000_000;// 10 days

    @Autowired
    private AccountService accountService;

    public String generateToken(UserDetails accountDetail) {
        return buildToken(accountDetail, 3600000);
    }

    public String generateRefreshToken(UserDetails accountDetail){
        return buildToken(accountDetail, EXPIRATION_TIME);
    }

    private String buildToken(UserDetails userDetails,long expirationTime) {
        Map<String, Object> claims = new HashMap<>();
        if(userDetails instanceof CustomAccountDetail customAccountDetail) {
            claims.put("roles", customAccountDetail.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList());
            claims.put("id", customAccountDetail.getAccount().getId());
            claims.put("username", customAccountDetail.getAccount().getUsername());

        }
        return Jwts.builder()
                .claims(claims)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ expirationTime))
                .signWith(getSigningKey())
                .compact();
    }
    public boolean isTokenValid(String token){
        try{
           String username = extractUsername(token);
           if(username.isEmpty() || accountService.loadUserByUsername(username) == null){
               return false;
           }
           if(isTokenExpired(token)){
                return false;
           }
            return !ExtractClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
    public String extractUsername(String token) {
        return ExtractClaims(token).getSubject();
    }

    private Claims ExtractClaims(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private Key getSigningKey(){
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
    public boolean isTokenExpired(String token) {
        return ExtractClaims(token).getExpiration().before(new Date());
    }

}
