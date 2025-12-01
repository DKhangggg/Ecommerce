package com.em.authservice.service;

import com.em.authservice.OpenFeign.UserClient;
import com.em.common.dto.auth.LoginRequest;
import com.em.common.dto.auth.RegisterRequest;
import com.em.authservice.dto.request.UserCreate;
import com.em.authservice.dto.response.AuthResponse;
import com.em.common.dto.auth.TokenValidResponse;
import com.em.authservice.dto.response.UserInfo;
import com.em.authservice.exception.InvalidTokenException;
import com.em.authservice.model.Account;
import com.em.authservice.model.CustomAccountDetail;
import com.em.authservice.model.Role;
import com.em.authservice.repository.AccountRepository;
import com.em.authservice.repository.RoleRepository;
import com.em.common.exception.InvalidRequestException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class AccountService implements UserDetailsService {

    private final AccountRepository accountRepo;
    private final RoleRepository roleRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserClient userClient;

    public AccountService(AccountRepository accountRepo, RoleRepository roleRepository, JwtService jwtService, BCryptPasswordEncoder bCryptPasswordEncoder, @Lazy AuthenticationManager authenticationManager, UserClient userClient) {
        this.accountRepo = accountRepo;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authenticationManager = authenticationManager;
        this.userClient = userClient;
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
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(account.getUsername());
        userInfo.setId(account.getId());
        Set<String> roleNames = account.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        log.info("User {} has roles: {}", account.getUsername(), roleNames);
        userInfo.setRoles(roleNames);
        String refreshTokenFromDb = account.getRefreshToken();
        if (refreshTokenFromDb != null && jwtService.isTokenValid(refreshTokenFromDb)) {
            return new AuthResponse(refreshTokenFromDb, jwtService.generateToken(accountDetail), userInfo);
        }
        String token = jwtService.generateToken(accountDetail);
        String refreshToken = jwtService.generateRefreshToken(accountDetail);
        account.setRefreshToken(refreshToken);
        accountRepo.save(account);
        return new AuthResponse(token, refreshToken, userInfo);

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
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(account.getUsername());
        userInfo.setId(account.getId());
        Set<String> roleNames = account.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        userInfo.setRoles(roleNames);
        return new AuthResponse(newAccessToken, newRefreshToken, userInfo);
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
        if (accountRepo.existsByEmail(request.getEmail())) {
            throw new InvalidRequestException("Email already exists");
        }
        Role userRole = roleRepository.findByRoleName("ROLE_USER")
                .orElseThrow(() -> new InvalidRequestException("Default USER role not found"));

        Account account = new Account();
        account.setUsername(request.getUsername());
        account.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        account.setEmail(request.getEmail());
        account.setActive(true);
        account.setRefreshToken(null);
        account.getRoles().add(userRole);
        Account savedAccount = accountRepo.save(account);
        UserCreate userCreate = new UserCreate();
        userCreate.setId(savedAccount.getId());
        userCreate.setFirstName(request.getFirstName());
        userCreate.setLastName(request.getLastName());
        userCreate.setEmail(request.getEmail());
        userCreate.setPhoneNumber(request.getPhoneNumber());
        userCreate.setGender(request.getGender());
        userCreate.setDateOfBirth(request.getDateOfBirth());
        userClient.createUser(userCreate);


        UserDetails accountDetail = loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(accountDetail);
        String refreshToken = jwtService.generateRefreshToken(accountDetail);
        savedAccount.setRefreshToken(refreshToken);
        accountRepo.save(savedAccount);
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(account.getUsername());
        userInfo.setId(account.getId());
        Set<String> roleNames = account.getRoles().stream()
                .map(Role::getRoleName)
                .collect(Collectors.toSet());
        userInfo.setRoles(roleNames);
        return new AuthResponse(token, refreshToken, userInfo);
    }

    public com.em.common.dto.auth.TokenValidResponse introspectToken(String token) {
        if (token == null || token.isEmpty()) {
            throw new InvalidRequestException("Token is required");
        }
        if (!jwtService.isTokenValid(token)) {
            throw new InvalidTokenException("Invalid token");
        }
        String username = jwtService.extractUsername(token);

        UserDetails userDetails = loadUserByUsername(username);

        if (!userDetails.getUsername().equals(username)) {
            throw new InvalidRequestException("Invalid username");
        }
        com.em.common.dto.auth.TokenValidResponse tv = new com.em.common.dto.auth.TokenValidResponse();
        tv.setUsername(userDetails.getUsername());
        tv.setValid(true);
        tv.setRoles(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
        return tv;

    }

    public long countAllAccounts() {
        return accountRepo.countAllAccounts();
    }

    public long countSellerAccounts() {
        return accountRepo.countSellerAccounts();
    }
}
