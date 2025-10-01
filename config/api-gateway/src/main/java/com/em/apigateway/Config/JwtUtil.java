package com.em.apigateway.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    private Key SigninKey(){
        return Keys.hmacShaKeyFor("mySecretKeyForJWTTokenGenerationThatIsLongEnoughToMeetTheRequirements256BitsMinimum".getBytes());
    }

    public Claims getClaims(String token){
        return Jwts.parserBuilder().setSigningKey(SigninKey()).build().parseClaimsJws(token).getBody();
    }
    public boolean validateToken(String token){
        try{
            Claims claims = getClaims(token);
            return true;
        } catch (Exception e){
            return false;
        }
    }

}
