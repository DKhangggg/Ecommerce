package com.em.authservice.service;

import com.em.authservice.model.CustomAccountDetail;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

    private final String SECRET_KEY = "super-secret-key-123456-people-must-change-this-key-now!";
    private final long EXPIRATION_TIME = 864_000_000;//


    private long refreshExpiration= 7*24*60*60*1000; // 7 days


    public String generateToken(UserDetails accountDetail) {
        return buildToken(accountDetail, EXPIRATION_TIME);
    }

    public String generateRefreshToken(UserDetails accountDetail){
        return buildToken(accountDetail, refreshExpiration);
    }

    private String buildToken(UserDetails userDetails,long expirationTime) {
        Map<String, Object> claims = new HashMap<>();
        if(userDetails instanceof CustomAccountDetail customAccountDetail) {
            claims.put("roles", customAccountDetail.getAuthorities()
                    .stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList());
            claims.put("id", customAccountDetail.getAccount().getId());


        }
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ expirationTime))
                .signWith(getSigningKey())
                .compact();
    }
    public boolean isTokenValid(String token){
        try{
           String username = extractUsername(token);
           if(username == null || username.isEmpty()){
               return false;
           }
           return !isTokenExpired(token);
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
