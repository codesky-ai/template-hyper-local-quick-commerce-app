-- HyperLocal Commerce Database Schema
-- MySQL Database Initialization Script
-- Run: mysql -u root -p < schema.sql

-- Create database
CREATE DATABASE IF NOT EXISTS hyperlocal_commerce
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE hyperlocal_commerce;

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Categories table
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(500),
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_name (name),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  in_stock BOOLEAN DEFAULT true,
  stock_quantity INT DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT NULL,
  review_count INT DEFAULT 0,
  delivery_time VARCHAR(50) DEFAULT '15-20 min',
  weight DECIMAL(8, 3) DEFAULT NULL,
  dimensions VARCHAR(100) DEFAULT NULL,
  brand VARCHAR(100) DEFAULT NULL,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_category (category),
  INDEX idx_name (name),
  INDEX idx_price (price),
  INDEX idx_in_stock (in_stock),
  INDEX idx_rating (rating),
  INDEX idx_featured (is_featured),
  INDEX idx_active (is_active),
  FULLTEXT idx_search (name, description, brand)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users table (for future user management)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Addresses table (for delivery addresses)
CREATE TABLE addresses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  name VARCHAR(255) DEFAULT NULL,
  street VARCHAR(500) NOT NULL,
  apartment VARCHAR(100) DEFAULT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) DEFAULT 'United States',
  latitude DECIMAL(10, 8) DEFAULT NULL,
  longitude DECIMAL(11, 8) DEFAULT NULL,
  is_default BOOLEAN DEFAULT false,
  delivery_instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_city (city),
  INDEX idx_zip_code (zip_code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) NOT NULL UNIQUE,
  user_id INT NULL,
  total DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_fee DECIMAL(10, 2) DEFAULT 0.00,
  tax_amount DECIMAL(10, 2) DEFAULT 0.00,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  status ENUM('pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50) DEFAULT 'cash_on_delivery',
  delivery_address TEXT NOT NULL,
  estimated_delivery DATETIME,
  actual_delivery DATETIME NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  delivery_instructions TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_order_number (order_number),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_payment_status (payment_status),
  INDEX idx_created_at (created_at),
  INDEX idx_customer_phone (customer_phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Order items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image VARCHAR(500),
  product_description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT,
  INDEX idx_order_id (order_id),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create triggers to update product stock and order totals
DELIMITER //

-- Trigger to automatically generate order numbers
CREATE TRIGGER generate_order_number
BEFORE INSERT ON orders
FOR EACH ROW
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    SET NEW.order_number = CONCAT('ORD', LPAD(NEW.id, 6, '0'), DATE_FORMAT(NOW(), '%Y%m%d'));
  END IF;
END //

-- Trigger to calculate order item total price
CREATE TRIGGER calculate_order_item_total
BEFORE INSERT ON order_items
FOR EACH ROW
BEGIN
  SET NEW.total_price = NEW.quantity * NEW.unit_price;
END //

CREATE TRIGGER update_order_item_total
BEFORE UPDATE ON order_items
FOR EACH ROW
BEGIN
  SET NEW.total_price = NEW.quantity * NEW.unit_price;
END //

DELIMITER ;

-- Insert default admin user (password should be hashed in real implementation)
INSERT INTO users (name, email, phone, password_hash, email_verified, is_active)
VALUES ('Admin User', 'admin@hyperlocal.com', '+1234567890', 'admin_password_hash', true, true);

-- Create some initial addresses for testing
INSERT INTO addresses (user_id, name, street, city, state, zip_code, is_default, delivery_instructions)
VALUES
(1, 'Home', '123 Main St, Apt 4B', 'Downtown', 'NY', '10001', true, 'Ring doorbell twice'),
(1, 'Office', '456 Business Ave, Suite 200', 'Midtown', 'NY', '10002', false, 'Ask for reception');

-- Display success message
SELECT 'Database schema created successfully!' as message;
SELECT 'Next step: Run seed.sql to insert sample data' as next_step;