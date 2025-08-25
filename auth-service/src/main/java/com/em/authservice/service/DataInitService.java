package com.em.authservice.service;

import com.em.authservice.model.Role;
import com.em.authservice.repository.RoleRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class DataInitService implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        initRoles();
    }

    private void initRoles() {
        log.info("Initializing default roles...");

        // Tạo role USER nếu chưa có
        if (!roleRepository.existsByRoleName("USER")) {
            Role userRole = new Role();
            userRole.setRoleName("USER");
            roleRepository.save(userRole);
            log.info("Created default USER role");
        }

        // Tạo role ADMIN nếu chưa có
        if (!roleRepository.existsByRoleName("ADMIN")) {
            Role adminRole = new Role();
            adminRole.setRoleName("ADMIN");
            roleRepository.save(adminRole);
            log.info("Created default ADMIN role");
        }

        // Tạo role MODERATOR nếu chưa có
        if (!roleRepository.existsByRoleName("MODERATOR")) {
            Role moderatorRole = new Role();
            moderatorRole.setRoleName("MODERATOR");
            roleRepository.save(moderatorRole);
            log.info("Created default MODERATOR role");
        }

        log.info("Role initialization completed");
    }
}
