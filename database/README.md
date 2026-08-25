# HyperLocal Commerce Database

MySQL database schema and sample data for the HyperLocal Commerce application.

## Overview

This database is designed to support a modern quick commerce application with the following entities:

- **Products** - Catalog of available items with categories, pricing, and inventory
- **Categories** - Product organization and browsing structure
- **Orders** - Customer orders with items, delivery tracking, and status management
- **Users** - Customer accounts and profiles (future expansion)
- **Addresses** - Delivery addresses with geolocation support

## Prerequisites

- **MySQL Server** 8.0 or higher
- **MySQL Client** or GUI tool like MySQL Workbench, phpMyAdmin, or Sequel Pro

## Quick Setup

### 1. Create Database and Schema
```bash
mysql -u root -p < schema.sql
```

### 2. Insert Sample Data
```bash
mysql -u root -p hyperlocal_commerce < seed.sql
```

### 3. Verify Installation
```bash
mysql -u root -p hyperlocal_commerce
```

Then run:
```sql
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_orders FROM orders;
```

## Database Schema

### Core Tables

#### Products Table
- **Purpose**: Store product catalog with pricing, inventory, and metadata
- **Key Features**: 
  - Full-text search on name, description, brand
  - Stock quantity tracking
  - Rating and review aggregation
  - Category relationships
  - Rich product metadata (weight, dimensions, delivery time)

#### Categories Table
- **Purpose**: Organize products into browsable categories
- **Key Features**:
  - Hierarchical structure support
  - Image and description for rich UI
  - Active/inactive status

#### Orders Table
- **Purpose**: Customer order management and tracking
- **Key Features**:
  - Comprehensive order lifecycle tracking
  - Payment status management
  - Delivery address and instructions
  - Customer information (supports guest checkout)
  - Automatic order number generation

#### Order Items Table
- **Purpose**: Line items for each order with product snapshots
- **Key Features**:
  - Product information snapshot at time of order
  - Quantity and pricing details
  - References to current product catalog

### Advanced Features

#### Triggers
- **Order Number Generation**: Automatically generates unique order numbers
- **Price Calculation**: Calculates order item totals automatically
- **Audit Trail**: Tracks creation and update timestamps

#### Indexes
- **Performance Optimization**: Strategic indexes for common queries
- **Full-text Search**: Optimized product search capabilities
- **Foreign Key Relationships**: Data integrity enforcement

## Sample Data

The seed data includes:

- **8 Categories**: Fruits & Vegetables, Dairy & Eggs, Meat & Seafood, Bakery, Beverages, Pantry & Snacks, Household, Personal Care
- **30+ Products**: Realistic product catalog with real Unsplash images
- **3 Sample Orders**: Various order states for testing
- **User & Address Data**: Foundation for customer management

### Product Features
- Real product names and descriptions
- Actual pricing structure
- High-quality product images from Unsplash
- Realistic delivery times (10-25 minutes)
- Customer ratings and review counts
- Stock quantity tracking

## Configuration

### Backend Connection

Update your backend `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hyperlocal_commerce
```

### Connection Pool Settings

The backend is configured with optimal connection pooling:
- **Connection Limit**: 10 concurrent connections
- **Timeout**: 60 seconds
- **Automatic Reconnection**: Enabled

## Database Operations

### Common Queries

#### Get Products by Category
```sql
SELECT p.* FROM products p
WHERE p.category = 'Fruits & Vegetables'
AND p.in_stock = true
ORDER BY p.rating DESC;
```

#### Search Products
```sql
SELECT * FROM products
WHERE MATCH(name, description, brand) AGAINST('organic fresh' IN BOOLEAN MODE)
AND in_stock = true;
```

#### Get Order with Items
```sql
SELECT
  o.*,
  oi.quantity,
  oi.unit_price,
  oi.product_name
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE o.id = 1;
```

#### Category Statistics
```sql
SELECT
  c.name,
  COUNT(p.id) as product_count,
  AVG(p.rating) as avg_rating,
  AVG(p.price) as avg_price
FROM categories c
LEFT JOIN products p ON c.name = p.category
WHERE p.is_active = true
GROUP BY c.id;
```

### Data Maintenance

#### Update Product Stock
```sql
UPDATE products
SET stock_quantity = stock_quantity - 5
WHERE id = 1;
```

#### Update Order Status
```sql
UPDATE orders
SET status = 'delivered',
    actual_delivery = NOW()
WHERE id = 1;
```

#### Product Inventory Report
```sql
SELECT
  name,
  stock_quantity,
  CASE
    WHEN stock_quantity = 0 THEN 'Out of Stock'
    WHEN stock_quantity < 10 THEN 'Low Stock'
    ELSE 'In Stock'
  END as stock_status
FROM products
ORDER BY stock_quantity ASC;
```

## Performance Optimization

### Indexes
The database includes optimized indexes for:
- Product searches and filtering
- Category browsing
- Order lookups and tracking
- Customer history queries

### Query Optimization
- Use prepared statements in application code
- Leverage full-text search for product queries
- Implement pagination for large result sets
- Cache frequently accessed category data

## Data Integrity

### Constraints
- **Foreign Key Constraints**: Maintain referential integrity
- **Check Constraints**: Validate data ranges and formats
- **Unique Constraints**: Prevent duplicate entries

### Triggers
- **Automatic Calculations**: Order totals and pricing
- **Audit Trails**: Track data changes
- **Business Rules**: Enforce domain logic at database level

## Backup and Recovery

### Backup Command
```bash
mysqldump -u root -p hyperlocal_commerce > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Command
```bash
mysql -u root -p hyperlocal_commerce < backup_file.sql
```

## Scaling Considerations

### For High Traffic
1. **Read Replicas**: Set up MySQL read replicas for query scaling
2. **Connection Pooling**: Optimize pool size based on concurrent users
3. **Caching**: Implement Redis/Memcached for frequently accessed data
4. **Partitioning**: Consider table partitioning for large orders table

### For Large Catalog
1. **Search Engine**: Consider Elasticsearch for advanced product search
2. **Image Storage**: Move product images to CDN
3. **Archive Strategy**: Archive old orders to maintain performance

## Troubleshooting

### Common Issues

#### Connection Problems
```sql
-- Check MySQL status
SHOW PROCESSLIST;
SHOW STATUS LIKE 'Threads_connected';
```

#### Performance Issues
```sql
-- Check slow queries
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- Analyze table performance
ANALYZE TABLE products;
ANALYZE TABLE orders;
```

#### Data Integrity
```sql
-- Check for orphaned records
SELECT COUNT(*) FROM order_items oi
LEFT JOIN orders o ON oi.order_id = o.id
WHERE o.id IS NULL;
```

## Migration Scripts

For schema updates, create numbered migration files:
- `001_initial_schema.sql`
- `002_add_user_preferences.sql`
- `003_add_product_variants.sql`

## Development vs Production

### Development
- Includes sample data for testing
- Detailed logging enabled
- Relaxed constraints for easier development

### Production
- Remove or anonymize sample data
- Enable performance monitoring
- Implement proper backup strategies
- Configure SSL connections