package com.em.authservice.service;

import com.em.authservice.dto.request.LoginRequest;
import com.em.authservice.dto.request.RegisterRequest;
import com.em.authservice.dto.response.AuthResponse;
import com.em.authservice.exception.InvalidRequestException;
import com.em.authservice.exception.InvalidTokenException;
import com.em.authservice.model.Account;
import com.em.authservice.model.CustomAccountDetail;
import com.em.authservice.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new com.em.authservice.model.CustomAccountDetail(account);
    }

    public AuthResponse login(LoginRequest request) {
        UserDetails accountDetail = loadUserByUsername(request.getUsername());
        if (!bCryptPasswordEncoder.matches(request.getPassword(), accountDetail.getPassword())) {
            throw new UsernameNotFoundException("Invalid username or password");
        } else {
            Account account = ((CustomAccountDetail) accountDetail).getAccount();
            if (account.getRefreshToken() != null && !account.getRefreshToken().isEmpty()) {
                String refreshTokenFromDb = account.getRefreshToken();
                if (jwtService.isTokenValid(refreshTokenFromDb)) {
                    return new AuthResponse(jwtService.generateToken(accountDetail), refreshTokenFromDb);
                }
            }
            String token = jwtService.generateToken(accountDetail);
            String refreshToken = jwtService.generateRefreshToken(accountDetail);
            account.setRefreshToken(refreshToken);
            accountRepo.save(account);
            return new AuthResponse(token, refreshToken);
        }
    }

    public AuthResponse refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new InvalidRequestException("Refresh token is required");
        }
        Account account = accountRepo.findByUsername(jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (account == null) {
            throw new UsernameNotFoundException("User not found with refresh token");
        }
        if (!refreshToken.equals(account.getRefreshToken())) {
            throw new InvalidTokenException("Invalid refresh token");
        }
        if (jwtService.isTokenExpired(refreshToken)) {
            throw new InvalidTokenException("Refresh token expired");
        }
        CustomAccountDetail accountDetail = new CustomAccountDetail(account);
        String newAccessToken = jwtService.generateToken(accountDetail);
        String newRefreshToken = jwtService.generateRefreshToken(accountDetail);
        account.setRefreshToken(newRefreshToken);
        accountRepo.save(account);

        return new AuthResponse(newAccessToken, newRefreshToken);
    }

    public void logout(String username) {
        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        account.setRefreshToken(null);
        accountRepo.save(account);
    }

    public AuthResponse register(RegisterRequest request) {
        if (accountRepo.existsByUsername(request.getUsername())) {
            throw new InvalidRequestException("Username already exists");
        }
        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        account.setEmail(request.getEmail());
        account.setRefreshToken(null);
        accountRepo.save(account);

        UserDetails accountDetail = loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(accountDetail);
        String refreshToken = jwtService.generateRefreshToken(accountDetail);
        account.setRefreshToken(refreshToken);
        accountRepo.save(account);

        return new AuthResponse(token, refreshToken);
    }
}
