-- Café Bohème Database Schema

CREATE DATABASE IF NOT EXISTS cafeboheme CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cafeboheme;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    stock INT DEFAULT 0,
    stock_min INT DEFAULT 5,
    active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stock history table for tracking
CREATE TABLE IF NOT EXISTS stock_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity_change INT NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert sample data
INSERT INTO products (name, category, price, description, image, stock, stock_min) VALUES
('Espresso', 'boissons-chaudes', 3.50, 'Café court et intense.', 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=300&fit=crop', 50, 10),
('Cappuccino', 'boissons-chaudes', 4.50, 'Mousse de lait généreuse.', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop', 40, 8),
('Latte vanille', 'boissons-chaudes', 5.00, 'Note douce et sucrée.', 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop', 35, 7),
('Ice latte', 'boissons-froides', 5.50, 'Version glacée rafraîchissante.', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=300&fit=crop', 30, 6),
('Frappuccino caramel', 'boissons-froides', 6.00, 'Crémeux et gourmand.', 'https://images.unsplash.com/photo-1562155955-1cb2d73488d7?w=400&h=300&fit=crop', 25, 5),
('Croissant beurre', 'patisseries', 2.50, 'Feuilleté croustillant.', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop', 20, 5),
('Cheesecake', 'patisseries', 5.00, 'Crémeux et citronné.', 'https://images.unsplash.com/photo-1702925614886-50ad13c88d3f?w=400&h=300&fit=crop', 15, 3),
('Sandwich poulet', 'sandwiches', 7.00, 'Poulet grillé et crudités.', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', 12, 4);

-- Insert default admin (password: admin123 - hashed)
INSERT INTO admins (username, password_hash, email) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@cafeboheme.tn');
