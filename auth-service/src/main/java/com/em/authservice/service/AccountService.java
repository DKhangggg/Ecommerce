package com.em.authservice.service;

import com.em.authservice.dto.request.LoginRequest;
import com.em.authservice.dto.request.RegisterRequest;
import com.em.authservice.dto.response.AuthResponse;
import com.em.authservice.dto.response.TokenValidResponse;
import com.em.authservice.exception.InvalidRequestException;
import com.em.authservice.exception.InvalidTokenException;
import com.em.authservice.model.Account;
import com.em.authservice.model.CustomAccountDetail;
import com.em.authservice.model.Role;
import com.em.authservice.repository.AccountRepository;
import com.em.authservice.repository.RoleRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepo;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;

    public AccountService(AccountRepository accountRepo, RoleRepository roleRepository, JwtService jwtService, BCryptPasswordEncoder bCryptPasswordEncoder, @Lazy AuthenticationManager authenticationManager) {
        this.accountRepo = accountRepo;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new com.em.authservice.model.CustomAccountDetail(account);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails accountDetail = loadUserByUsername(request.getUsername());
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

    public AuthResponse refreshToken(String refreshToken) {
        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new InvalidRequestException("Refresh token is required");
        }
        Account account = accountRepo.findByUsername(jwtService.extractUsername(refreshToken))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

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
        if(accountRepo.existsByEmail(request.getEmail())){
            throw new InvalidRequestException("Email already exists");
        }

        Role userRole = roleRepository.findByRoleName("USER")
                .orElseThrow(() -> new InvalidRequestException("Default USER role not found"));

        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        account.setEmail(request.getEmail());
        account.setActive(true);
        account.setRefreshToken(null);
        account.getRoles().add(userRole);

        accountRepo.save(account);

        UserDetails accountDetail = loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(accountDetail);
        String refreshToken = jwtService.generateRefreshToken(accountDetail);
        account.setRefreshToken(refreshToken);
        accountRepo.save(account);

        return new AuthResponse(token, refreshToken);
    }
    public TokenValidResponse introspectToken(String token){
        if(token==null || token.isEmpty()){
            throw new InvalidRequestException("Token is required");
        }
        if(!jwtService.isTokenValid(token) ){
            throw new InvalidTokenException("Invalid token");
        }
        String username = jwtService.extractUsername(token);

        UserDetails userDetails = loadUserByUsername(username);

        if (!userDetails.getUsername().equals(username)){
            throw new InvalidRequestException("Invalid username");
        }
        return TokenValidResponse.builder()
                .username(userDetails.getUsername())
                .valid(true)
                .roles(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList())
                .build();

    }
}
