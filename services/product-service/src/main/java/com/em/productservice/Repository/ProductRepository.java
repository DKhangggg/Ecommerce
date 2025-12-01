package com.em.productservice.Repository;

import com.em.productservice.Model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    Optional<Product> findByName(String name);

    boolean existsByName(String name);

    Optional<Product> findByNameIgnoreCase(String name);

    boolean existsByNameIgnoreCase(String name);

    List<Product> findAllByIdIn(List<String> ids);

    // 1. Featured
    List<Product> findByIsFeaturedTrue(Pageable pageable);

    // 2. New Arrivals
    List<Product> findByIsAvailableTrue(Pageable pageable);

    // 3. Most Liked
    List<Product> findByIsAvailableTrueOrderByAverageRatingDesc(Pageable pageable);

    // 4. Basic paginated find-all for shop
    Page<Product> findAll(Pageable pageable);
}
