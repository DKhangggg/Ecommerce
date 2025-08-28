package com.em.authservice.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

public class CustomAccountDetail implements UserDetails {

    private final Account account;

    public CustomAccountDetail(Account account) {
        this.account = account;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<Role> roles = account.getRoles();
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toSet());
    }

    @Override
    public String getPassword() {
        return account.getPassword();
    }

    @Override
    public String getUsername() {
        return account.getUsername();
    }

    @Override
    public boolean isEnabled() {
        return account.isActive();
    }

    public Account getAccount() {
        return account;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Account không bao giờ expired
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Account không bị lock
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Credentials không expired
    }
}
