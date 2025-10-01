package com.em.common.specification;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SpecificationBuilder<T> {

    public Specification<T> build(Map<String, Object> filters) {
        return (Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filters != null && !filters.isEmpty()) {
                for (Map.Entry<String, Object> entry : filters.entrySet()) {
                    String key = entry.getKey();
                    Object value = entry.getValue();

                    if (value == null) {
                        continue;
                    }


                    if (value instanceof String) {
                        String stringValue = (String) value;
                        if (!stringValue.trim().isEmpty()) {
                            predicates.add(
                                cb.like(
                                    cb.lower(root.get(key).as(String.class)),
                                    "%" + stringValue.toLowerCase() + "%"
                                )
                            );
                        }
                    }
                    else {
                        predicates.add(cb.equal(root.get(key), value));
                    }
                }
            }

            return predicates.isEmpty()
                ? cb.conjunction()
                : cb.and(predicates.toArray(new Predicate[0]));
        };
    }
    public Specification<T> build(Map<String, Object> filters, Specification<T> customSpec) {
        Specification<T> baseSpec = build(filters);
        return customSpec == null ? baseSpec : baseSpec.and(customSpec);
    }
}

