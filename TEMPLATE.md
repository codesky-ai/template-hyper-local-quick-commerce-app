# Hyper-Local Quick Commerce App

> A delivery app tailored for startup neighborhood grocery stores. Features real-time inventory sync, driver tracking, and automated WhatsApp order confirmations.

<div dir="rtl"><b>تطبيق التجارة السريعة المحلية</b> — تطبيق توصيل مخصص للشركات الناشئة في مجال بقالة الأحياء. يتميز بمزامنة المخزون في الوقت الفعلي، وتتبع السائقين، وتأكيدات الطلبات الآلية عبر واتساب.</div>

`hyper-local-quick-commerce-app` · ecommerce · 34 files · generated from the CodeSky template gallery

## What this is

This is a neighborhood grocery delivery app template built for quick-commerce startups. It ships with inventory management, order placement, and a customer-facing storefront, all backed by MySQL and a REST API. The template includes database seeding for local development and a fallback to mock data when the backend is unreachable.

## Stack

| Layer | Technology |
|---|---|
| Frontend | React 18.2.0 + Vite |
| Backend | Node + Express |
| Database | SQL schema included |
| Tests | none |
| Container | none |

## Architecture

The frontend is a React single-page application styled with Tailwind and served by Vite. It calls a Node/Express backend through an axios client that gracefully degrades to mock data if any endpoint fails. The backend exposes REST routes for products, categories, and orders, reading from and writing to a MySQL database defined by schema.sql and populated by seed.sql. State lives in React component memory; persistent data lives in MySQL tables for users, addresses, products, categories, orders, and order_items. Authentication tokens appear in the environment configuration but no login or registration endpoints exist, and the JWT_SECRET is present but unused in the provided routes.

### Layout

```
backend/.env.example
backend/README.md
backend/package.json
backend/src/app.ts
backend/src/config/database.ts
backend/src/controllers/categoryController.ts
backend/src/controllers/orderController.ts
backend/src/controllers/productController.ts
backend/src/models/index.ts
backend/src/routes/index.ts
backend/src/server.ts
backend/tsconfig.json
database/README.md
database/schema.sql
database/seed.sql
frontend/index.html
frontend/package.json
frontend/postcss.config.js
frontend/src/App.tsx
frontend/src/api/client.ts
frontend/src/api/mockData.ts
frontend/src/components/Cart.tsx
frontend/src/components/CategoryGrid.tsx
frontend/src/components/Header.tsx
frontend/src/components/ProductCard.tsx
frontend/src/components/ProductGrid.tsx
frontend/src/index.css
frontend/src/main.tsx
frontend/src/services/apiService.ts
frontend/src/types/index.ts
frontend/tailwind.config.js
frontend/tsconfig.json
frontend/tsconfig.node.json
frontend/vite.config.ts
```

### Data model

Tables defined in the SQL schema:

- `addresses`
- `categories`
- `order_items`
- `orders`
- `products`
- `users`

### API surface

```
GET    /
GET    /categories
GET    /categories/:id
GET    /health
GET    /orders
GET    /orders/:id
GET    /products
GET    /products/:id
GET    /products/category/:categoryId
GET    /products/search
PATCH  /orders/:id/status
POST   /categories
POST   /orders
POST   /products
PUT    /categories/:id
```

## Running it

```bash
# frontend
cd frontend && npm install && npm run dev

# backend
cd backend && npm install && npm run dev
```

Configuration is read from an `.env` file. Copy `.env.example` and set:

- `DB_HOST`
- `DB_NAME`
- `DB_PASSWORD`
- `DB_USER`
- `FRONTEND_URL`
- `JWT_SECRET`
- `NODE_ENV`
- `PORT`
- `RATE_LIMIT_MAX_REQUESTS`
- `RATE_LIMIT_WINDOW_MS`

## What is next

1. **Add user authentication endpoints** — The backend references JWT_SECRET and the database has a users table, but no login or registration routes exist to issue or verify tokens.
2. **Implement WhatsApp order confirmations** — The description promises automated WhatsApp notifications, but no messaging service integration or webhook handlers are present in the codebase.
3. **Build driver tracking features** — Driver tracking is advertised but the schema has no drivers table, no geolocation fields, and no socket or polling mechanism for real-time updates.
4. **Replace mock data fallback with proper error handling** — The frontend silently falls back to mock data on every API failure, masking production issues and serving stale sample records.
5. **Add automated tests** — No test files or test runners exist, leaving the REST endpoints and React components unvalidated against regressions.
6. **Create Docker Compose setup** — No Dockerfile or docker-compose.yml is provided, forcing each developer to install Node, MySQL, and manage separate processes manually.
7. **Move hardcoded values to environment config** — Rate limit thresholds and frontend URL are in .env.example, but other settings like port defaults may be scattered in code without clear documentation.

### Markers left in the code

Found by scanning for TODO/FIXME/placeholder:

```
frontend/src/components/ProductGrid.tsx: {searchQuery ? 'No products found' : 'Coming Soon'}
frontend/src/services/apiService.ts: console.warn('Products API failed, using mock data:', error);
frontend/src/services/apiService.ts: console.warn('Product by ID API failed, using mock data:', error);
frontend/src/services/apiService.ts: console.warn('Products by category API failed, using mock data:', error);
frontend/src/services/apiService.ts: console.warn('Categories API failed, using mock data:', error);
frontend/src/services/apiService.ts: console.warn('Orders API failed, using mock data:', error);
frontend/src/services/apiService.ts: console.warn('Search API failed, using mock data:', error);
```

---

<sub>Exported from the CodeSky template gallery. Generated code — review before production use. <a href="https://codesky.ai">codesky.ai</a></sub>
