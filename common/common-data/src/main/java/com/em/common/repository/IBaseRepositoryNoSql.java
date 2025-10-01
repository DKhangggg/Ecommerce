package com.em.common.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@NoRepositoryBean
public interface IBaseRepositoryNoSql<T, ID extends Serializable> extends MongoRepository<T, ID> {


    default Optional<T> findActiveById(ID id) {
        return findById(id).filter(entity -> {
            try {
                Method isDeletedMethod = entity.getClass().getMethod("isDeleted");
                Boolean deleted = (Boolean) isDeletedMethod.invoke(entity);
                return deleted == null || !deleted;
            } catch (Exception e) {
                return true;
            }
        });
    }


    default List<T> findAllActive() {
        return findAll().stream()
                .filter(entity -> {
                    try {
                        Method isDeletedMethod = entity.getClass().getMethod("isDeleted");
                        Boolean deleted = (Boolean) isDeletedMethod.invoke(entity);
                        return deleted == null || !deleted;
                    } catch (Exception e) {
                        return true;
                    }
                })
                .collect(Collectors.toList());
    }

    default T softDelete(T entity) {
        try {
            try {
                Method softDeleteMethod = entity.getClass().getMethod("softDelete");
                softDeleteMethod.invoke(entity);
            } catch (NoSuchMethodException e) {
                Method setDeletedMethod = entity.getClass().getMethod("setDeleted", boolean.class);
                setDeletedMethod.invoke(entity, true);
            }
            return save(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to soft delete entity: " + e.getMessage(), e);
        }
    }
    default boolean softDeleteById(ID id) {
        Optional<T> entity = findById(id);
        if (entity.isPresent()) {
            softDelete(entity.get());
            return true;
        }
        return false;
    }

    default T restore(T entity) {
        try {
            // Try to call restore() method first
            try {
                Method restoreMethod = entity.getClass().getMethod("restore");
                restoreMethod.invoke(entity);
            } catch (NoSuchMethodException e) {
                // If restore() doesn't exist, try setDeleted(false)
                Method setDeletedMethod = entity.getClass().getMethod("setDeleted", boolean.class);
                setDeletedMethod.invoke(entity, false);
            }
            return save(entity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to restore entity: " + e.getMessage(), e);
        }
    }

    default long countActive() {
        return findAllActive().size();
    }
}
