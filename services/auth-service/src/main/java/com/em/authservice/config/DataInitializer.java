package com.em.authservice.config;

import com.em.authservice.model.Role;
import com.em.authservice.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    public final RoleRepository roleRepo;

    @Override
    public void run(String... args) throws Exception {
        if (roleRepo.findAll().isEmpty()) {
            Role role = new Role();
            role.setRoleName("ROLE_USER");
            Role role4 = new Role();
            role4.setRoleName("ROLE_SELLER");
            Role role1 = new Role();
            role1.setRoleName("ROLE_ADMIN");
            Role role2 = new Role();
            role2.setRoleName("ROLE_MANAGER");
            roleRepo.save(role);
            roleRepo.save(role1);
            roleRepo.save(role2);
            roleRepo.save(role4);
        }
    }
}
