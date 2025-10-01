package com.em.common.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@NoRepositoryBean
public interface IBaseRepository<T,ID extends Serializable> extends JpaRepository<T,ID> {

    default void softDeleteById(T entity){
        try {
            Method setDeleted = entity.getClass().getMethod("setDeleted", boolean.class);
            setDeleted.invoke(entity, true);
            Method setDeletedAt = entity.getClass().getMethod("setDeletedAt", LocalDateTime.class);
            setDeletedAt.invoke(entity, LocalDateTime.now());
            save(entity);
        } catch (Exception e) {
            throw new UnsupportedOperationException("Entity does not support soft delete", e);
        }
    }
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
