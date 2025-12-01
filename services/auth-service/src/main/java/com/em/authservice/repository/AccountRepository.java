package com.em.authservice.repository;

import com.em.authservice.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface AccountRepository extends JpaRepository<Account, UUID> {

    Optional<Account> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Query("select count(a) from Account a")
    long countAllAccounts();

    @Query("select count(distinct a) from Account a join a.roles r where r.roleName = 'ROLE_SELLER'")
    long countSellerAccounts();
}
