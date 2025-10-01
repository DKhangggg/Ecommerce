package com.em.common.util;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class JpaUtils {

    private final EntityManager entityManager;


    public JpaUtils(EntityManager entityManager) {
        this.entityManager = entityManager;
    }


    @SuppressWarnings("unchecked")
    public <T> List<T> runNativeQuery(String sql, Map<String, Object> params, Class<T> resultClass) {
        Query query = entityManager.createNativeQuery(sql, resultClass);

        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                query.setParameter(entry.getKey(), entry.getValue());
            }
        }

        return query.getResultList();
    }


    @SuppressWarnings("unchecked")
    public List<Object> runNativeQuery(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);

        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                query.setParameter(entry.getKey(), entry.getValue());
            }
        }

        return query.getResultList();
    }


    public int executeNativeUpdate(String sql, Map<String, Object> params) {
        Query query = entityManager.createNativeQuery(sql);

        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                query.setParameter(entry.getKey(), entry.getValue());
            }
        }

        return query.executeUpdate();
    }


    @SuppressWarnings("unchecked")
    public <T> T runNativeQuerySingleResult(String sql, Map<String, Object> params, Class<T> resultClass) {
        Query query = entityManager.createNativeQuery(sql, resultClass);

        if (params != null && !params.isEmpty()) {
            for (Map.Entry<String, Object> entry : params.entrySet()) {
                query.setParameter(entry.getKey(), entry.getValue());
            }
        }

        List<T> results = query.getResultList();
        return results.isEmpty() ? null : results.get(0);
    }
}

