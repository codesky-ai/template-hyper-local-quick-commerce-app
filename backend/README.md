# HyperLocal Commerce API

Backend API server for the HyperLocal Commerce application built with Node.js, Express, TypeScript, and MySQL.

## Features

- **RESTful API** with comprehensive product, category, and order management
- **MySQL Database** with connection pooling for optimal performance
- **TypeScript** for type safety and better development experience
- **Security Features** including CORS, rate limiting, and helmet protection
- **Error Handling** with consistent API responses
- **Development Tools** with hot reloading and detailed logging

## Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=hyperlocal_commerce
FRONTEND_URL=http://localhost:5173
```

### 3. Setup Database
1. Create the MySQL database:
   ```bash
   mysql -u root -p
   CREATE DATABASE hyperlocal_commerce;
   exit
   ```

2. Run the database schema:
   ```bash
   mysql -u root -p hyperlocal_commerce < ../database/schema.sql
   ```

3. Insert sample data:
   ```bash
   mysql -u root -p hyperlocal_commerce < ../database/seed.sql
   ```

### 4. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build the TypeScript code
- `npm start` - Start production server
- `npm run watch` - Start development server with file watching

## API Endpoints

### Health Check
- `GET /api/health` - API health status

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get single product by ID
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/search?q=query` - Search products
- `POST /api/products` - Create new product (admin)

### Categories
- `GET /api/categories` - Get all categories with product counts
- `GET /api/categories/:id` - Get single category by ID
- `POST /api/categories` - Create new category (admin)
- `PUT /api/categories/:id` - Update category (admin)

### Orders
- `GET /api/orders` - Get all orders with items
- `GET /api/orders/:id` - Get single order by ID
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (admin)

## API Response Format

All API responses follow this consistent format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string
}
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image VARCHAR(500),
  category VARCHAR(100),
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2),
  delivery_time VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  total DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled') DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  estimated_delivery DATETIME,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(20),
  customer_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid request parameters
- **404 Not Found** - Resource not found
- **409 Conflict** - Resource already exists
- **429 Too Many Requests** - Rate limit exceeded
- **500 Internal Server Error** - Server errors

## Security Features

- **CORS** protection with configurable origins
- **Rate Limiting** to prevent abuse
- **Helmet** for security headers
- **Input Validation** for all endpoints
- **SQL Injection** protection with parameterized queries

## Development

### Adding New Endpoints

1. Create controller functions in `src/controllers/`
2. Define routes in `src/routes/index.ts`
3. Add TypeScript interfaces in `src/models/index.ts`
4. Test endpoints with your preferred API client

### Database Migrations

When making schema changes:

1. Update the schema in `../database/schema.sql`
2. Create migration scripts if needed
3. Update TypeScript interfaces in `src/models/`

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables
3. Start the production server:
   ```bash
   npm start
   ```

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MySQL is running: `sudo service mysql status`
   - Verify credentials in `.env` file
   - Ensure database exists

2. **Port Already in Use**
   - Change PORT in `.env` file
   - Or kill existing process: `lsof -ti:3001 | xargs kill -9`

3. **CORS Errors**
   - Check FRONTEND_URL in `.env` matches your frontend URL
   - Verify cors configuration in `src/app.ts`

### Logs

Development logs include:
- Request details (method, URL, response time)
- Database connection status
- Error stack traces

## Contributing

1. Follow TypeScript best practices
2. Add proper error handling for new endpoints
3. Include JSDoc comments for complex functions
4. Test with both success and error scenarios