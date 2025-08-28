-- Khởi tạo các role mặc định
-- Sử dụng INSERT với WHERE NOT EXISTS thay vì ON CONFLICT
INSERT INTO roles (role_name, created_at, updated_at)
SELECT 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'ADMIN');

INSERT INTO roles (role_name, created_at, updated_at)
SELECT 'USER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'USER');

INSERT INTO roles (role_name, created_at, updated_at)
SELECT 'MANAGER', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE role_name = 'MANAGER');
