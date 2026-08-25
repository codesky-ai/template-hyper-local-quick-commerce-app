-- HyperLocal Commerce Database Sample Data
-- MySQL Sample Data Insertion Script
-- Run after schema.sql: mysql -u root -p hyperlocal_commerce < seed.sql

USE hyperlocal_commerce;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE order_items;
TRUNCATE TABLE orders;
TRUNCATE TABLE products;
TRUNCATE TABLE categories;
SET FOREIGN_KEY_CHECKS = 1;

-- Insert categories with real Unsplash images
INSERT INTO categories (name, image, description) VALUES
('Fruits & Vegetables', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'Fresh, organic fruits and vegetables delivered daily'),
('Dairy & Eggs', 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'Farm-fresh dairy products and free-range eggs'),
('Meat & Seafood', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400', 'Premium quality meat and fresh seafood'),
('Bakery & Bread', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Freshly baked bread and pastries'),
('Beverages', 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 'Refreshing drinks and specialty beverages'),
('Pantry & Snacks', 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400', 'Essential pantry items and healthy snacks'),
('Household Items', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 'Daily household necessities and cleaning supplies'),
('Personal Care', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 'Health and beauty products for daily care');

-- Insert products with real Unsplash images
INSERT INTO products (name, description, price, image, category, in_stock, stock_quantity, rating, review_count, delivery_time, brand, is_featured) VALUES

-- Fruits & Vegetables
('Fresh Avocados', 'Premium Hass avocados, perfectly ripe and creamy. Rich in healthy fats and perfect for toast, salads, or guacamole.', 4.99, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400', 'Fruits & Vegetables', true, 45, 4.8, 156, '15-20 min', 'Fresh Farms', true),
('Organic Bananas', 'Sweet, ripe organic bananas packed with potassium and natural energy. Perfect for smoothies and snacking.', 2.99, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', 'Fruits & Vegetables', true, 78, 4.6, 203, '15-20 min', 'Organic Valley', true),
('Rainbow Bell Peppers', 'Colorful mix of red, yellow, and orange bell peppers. Sweet, crispy, and packed with vitamin C.', 5.49, 'https://images.unsplash.com/photo-1525607551862-4d36b38746db?w=400', 'Fruits & Vegetables', true, 32, 4.7, 89, '15-20 min', 'Garden Fresh', false),
('Organic Baby Spinach', 'Tender baby spinach leaves, perfect for salads, smoothies, and cooking. Pre-washed and ready to eat.', 3.99, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', 'Fruits & Vegetables', true, 56, 4.5, 127, '15-20 min', 'Organic Valley', false),
('Fresh Strawberries', 'Sweet, juicy strawberries bursting with flavor. Perfect for desserts, smoothies, or eating fresh.', 6.99, 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', 'Fruits & Vegetables', true, 28, 4.9, 342, '15-20 min', 'Berry Best', true),

-- Dairy & Eggs
('Greek Yogurt', 'Thick, creamy Greek yogurt with live and active cultures. High protein and perfect for breakfast or snacking.', 5.49, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', 'Dairy & Eggs', true, 67, 4.5, 178, '15-20 min', 'Chobani', false),
('Free-Range Eggs', 'Farm-fresh eggs from free-range chickens. Rich, golden yolks perfect for any meal of the day.', 4.99, 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', 'Dairy & Eggs', true, 89, 4.8, 267, '15-20 min', 'Happy Hens', true),
('Organic Whole Milk', 'Pure, creamy organic whole milk from grass-fed cows. No hormones or antibiotics added.', 4.49, 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400', 'Dairy & Eggs', true, 43, 4.6, 145, '15-20 min', 'Organic Valley', false),
('Artisan Cheese Selection', 'Curated selection of premium artisan cheeses including aged cheddar, brie, and goat cheese.', 18.99, 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', 'Dairy & Eggs', true, 15, 4.9, 78, '15-20 min', 'Artisan Dairy', true),

-- Meat & Seafood
('Wild-Caught Salmon', 'Fresh Atlantic salmon fillet, wild-caught and sustainably sourced. Perfect for grilling or baking.', 24.99, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400', 'Meat & Seafood', true, 12, 4.7, 156, '20-25 min', 'Ocean Fresh', true),
('Grass-Fed Ground Beef', 'Premium grass-fed ground beef, 85% lean. Perfect for burgers, tacos, and pasta sauces.', 12.99, 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=400', 'Meat & Seafood', true, 23, 4.6, 198, '20-25 min', 'Prairie Prime', false),
('Organic Chicken Breast', 'Boneless, skinless organic chicken breasts. Free-range and antibiotic-free.', 16.99, 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400', 'Meat & Seafood', true, 18, 4.8, 134, '20-25 min', 'Free Bird', true),
('Fresh Shrimp', 'Large, fresh shrimp, peeled and deveined. Perfect for pasta, stir-fry, or grilling.', 19.99, 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400', 'Meat & Seafood', true, 16, 4.5, 89, '20-25 min', 'Sea Harvest', false),

-- Bakery & Bread
('Artisan Sourdough Bread', 'Hand-crafted sourdough bread with a crispy crust and tangy flavor. Baked fresh daily.', 6.99, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400', 'Bakery & Bread', true, 34, 4.9, 245, '10-15 min', 'Artisan Bakery', true),
('Chocolate Croissants', 'Buttery, flaky croissants filled with rich dark chocolate. Perfect for breakfast or afternoon treat.', 3.99, 'https://images.unsplash.com/photo-1555507036-ab794f4c99a3?w=400', 'Bakery & Bread', true, 28, 4.7, 167, '10-15 min', 'French Corner', true),
('Whole Grain Bagels', 'Fresh, chewy whole grain bagels packed with seeds and grains. Perfect for breakfast sandwiches.', 5.49, 'https://images.unsplash.com/photo-1621183935940-7d772fb37fb8?w=400', 'Bakery & Bread', true, 42, 4.4, 112, '10-15 min', 'Brooklyn Bagels', false),
('Blueberry Muffins', 'Fluffy muffins bursting with fresh blueberries. Made with real butter and natural ingredients.', 4.99, 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400', 'Bakery & Bread', true, 24, 4.6, 198, '10-15 min', 'Sunrise Bakery', false),

-- Beverages
('Cold Brew Coffee', 'Smooth, rich cold brew coffee concentrate. Just add water or milk for the perfect iced coffee.', 8.99, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', 'Beverages', true, 45, 4.8, 289, '10-15 min', 'Third Wave Coffee', true),
('Fresh Orange Juice', 'Freshly squeezed orange juice with no additives or preservatives. Pure citrus goodness.', 4.99, 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400', 'Beverages', true, 56, 4.6, 178, '10-15 min', 'Sunshine Citrus', true),
('Sparkling Water Variety', 'Refreshing sparkling water in assorted natural flavors. Zero calories and naturally flavored.', 6.49, 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', 'Beverages', true, 78, 4.3, 145, '10-15 min', 'Crystal Springs', false),
('Green Tea Kombucha', 'Probiotic-rich kombucha made with organic green tea. Lightly effervescent and gut-healthy.', 5.99, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', 'Beverages', true, 32, 4.5, 167, '10-15 min', 'Living Cultures', false),

-- Pantry & Snacks
('Organic Quinoa', 'Premium organic quinoa, a complete protein superfood. Perfect for salads, bowls, and side dishes.', 7.99, 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400', 'Pantry & Snacks', true, 67, 4.6, 134, '15-20 min', 'Ancient Grains', false),
('Mixed Nuts Premium', 'Premium mix of roasted almonds, cashews, walnuts, and pecans. Perfect healthy snacking.', 12.99, 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', 'Pantry & Snacks', true, 45, 4.7, 189, '15-20 min', 'Nutty Delights', true),
('Dark Chocolate', 'Rich 70% dark chocolate bar made with single-origin cacao. Smooth, complex flavor profile.', 4.49, 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', 'Pantry & Snacks', true, 38, 4.8, 234, '15-20 min', 'Cacao Dreams', true),
('Honey Oat Granola', 'Crunchy granola made with rolled oats, honey, and dried fruits. Perfect for breakfast or snacking.', 8.99, 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400', 'Pantry & Snacks', true, 29, 4.4, 167, '15-20 min', 'Morning Crunch', false),

-- Household Items
('Eco-Friendly Dish Soap', 'Plant-based dish soap that cuts through grease while being gentle on hands and environment.', 5.99, 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 'Household Items', true, 56, 4.5, 145, '15-20 min', 'Green Clean', false),
('Bamboo Paper Towels', 'Sustainable bamboo paper towels that are stronger and more absorbent than traditional paper.', 7.49, 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400', 'Household Items', true, 34, 4.6, 167, '15-20 min', 'Eco Essentials', true),
('Lavender Laundry Detergent', 'Concentrated laundry detergent with natural lavender scent. Gentle on clothes and skin.', 12.99, 'https://images.unsplash.com/photo-1610557892134-71e38210d8ee?w=400', 'Household Items', true, 28, 4.7, 123, '15-20 min', 'Pure Clean', false),

-- Personal Care
('Natural Shampoo & Conditioner', 'Sulfate-free shampoo and conditioner set made with organic ingredients for healthy hair.', 16.99, 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400', 'Personal Care', true, 23, 4.6, 189, '15-20 min', 'Nature's Touch', true),
('Organic Face Moisturizer', 'Lightweight daily moisturizer with organic ingredients. Perfect for all skin types.', 24.99, 'https://images.unsplash.com/photo-1571019613457-d6bf75a9a3c9?w=400', 'Personal Care', true, 18, 4.8, 234, '15-20 min', 'Pure Skincare', true),
('Bamboo Toothbrushes', 'Eco-friendly bamboo toothbrushes with soft bristles. Biodegradable and sustainable.', 8.99, 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400', 'Personal Care', true, 45, 4.4, 167, '15-20 min', 'Eco Smile', false);

-- Insert sample orders
INSERT INTO orders (order_number, total, subtotal, delivery_fee, status, delivery_address, estimated_delivery, customer_name, customer_phone, customer_email, delivery_instructions) VALUES
('ORD00000120240315', 16.97, 14.98, 1.99, 'on_the_way', '123 Main St, Apt 4B, Downtown, NY 10001', DATE_ADD(NOW(), INTERVAL 15 MINUTE), 'John Smith', '+1234567890', 'john.smith@email.com', 'Ring doorbell twice'),
('ORD00000220240314', 43.98, 41.98, 2.00, 'delivered', '456 Oak Ave, Unit 2, Midtown, NY 10002', DATE_SUB(NOW(), INTERVAL 1 DAY), 'Sarah Johnson', '+1987654321', 'sarah.j@email.com', 'Leave at front desk'),
('ORD00000320240313', 28.47, 26.47, 2.00, 'preparing', '789 Pine St, Downtown, NY 10001', DATE_ADD(NOW(), INTERVAL 25 MINUTE), 'Mike Davis', '+1555123456', 'mike.davis@email.com', 'Apartment buzzer #12');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, product_name, product_image) VALUES
-- Order 1 items
(1, 1, 2, 4.99, 'Fresh Avocados', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'),
(1, 9, 1, 4.99, 'Free-Range Eggs', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400'),

-- Order 2 items
(2, 11, 1, 24.99, 'Wild-Caught Salmon', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'),
(2, 17, 2, 8.99, 'Cold Brew Coffee', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400'),

-- Order 3 items
(3, 15, 1, 6.99, 'Artisan Sourdough Bread', 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'),
(3, 22, 1, 12.99, 'Mixed Nuts Premium', 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400'),
(3, 7, 1, 5.49, 'Greek Yogurt', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400');

-- Display sample data summary
SELECT 'Sample data inserted successfully!' as message;

SELECT
  'Categories' as table_name,
  COUNT(*) as count
FROM categories
UNION ALL
SELECT
  'Products' as table_name,
  COUNT(*) as count
FROM products
UNION ALL
SELECT
  'Orders' as table_name,
  COUNT(*) as count
FROM orders
UNION ALL
SELECT
  'Order Items' as table_name,
  COUNT(*) as count
FROM order_items;

-- Show featured products
SELECT
  'Featured Products:' as info,
  name,
  price,
  category,
  rating
FROM products
WHERE is_featured = true
ORDER BY rating DESC;

-- Show category product counts
SELECT
  c.name as category,
  COUNT(p.id) as product_count,
  AVG(p.rating) as avg_rating
FROM categories c
LEFT JOIN products p ON c.name = p.category
GROUP BY c.id, c.name
ORDER BY product_count DESC;