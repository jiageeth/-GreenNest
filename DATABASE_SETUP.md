# GreenNest - Database Setup Guide

This guide explains how to set up MySQL and run the GreenNest e-nursery with database-driven products.

## Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (5.7 or 8.0) - [Download](https://dev.mysql.com/downloads/mysql/)

---

## 1. Create MySQL Database

1. Open MySQL command line or MySQL Workbench
2. Run the schema and seed files:

```bash
# From project root
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

Or in MySQL Workbench:
- Open `database/schema.sql` and execute
- Open `database/seed.sql` and execute

---

## 2. Configure Backend

1. Copy the example env file:
   ```
   copy backend\.env.example backend\.env
   ```

2. Edit `backend\.env` with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=greennest_db
   PORT=3000
   ```

---

## 3. Start the Backend Server

```bash
cd backend
npm install
npm start
```

The API will run at **http://localhost:3000**

---

## 4. Open the Website

Serve the frontend (HTML files) with a local server. Options:

**Option A - VS Code Live Server**
- Install "Live Server" extension
- Right-click `Home/1st.html` → "Open with Live Server"

**Option B - Python**
```bash
python -m http.server 8080
# Open http://localhost:8080/Home/1st.html
```

**Option C - Node.js serve**
```bash
npx serve .
# Open the URL shown (e.g. http://localhost:3000)
```

---

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | All products (optional: `?category=plants`, `?search=indoor`) |
| `GET /api/products/:id` | Product by ID |
| `GET /api/products/slug/:slug` | Product by slug |
| `GET /api/products/category/:slug` | Products by category |
| `GET /api/products/categories/all` | All categories |

---

## Product Categories (in database)

- **Plants** - Indoor/outdoor live plants
- **Seeds** - Vegetable, flower, herb seeds
- **Fertilizers & Nutrients** - Plant food, bloom boosters
- **Pots & Planters** - Ceramic, hanging, self-watering
- **Garden Tools** - Pruning shears, watering cans, trowels
- **Pesticides** - Neem oil, insecticidal soap, fungicides

---

## Adding More Products

Insert into the `products` table:

```sql
INSERT INTO products (name, slug, description, short_description, category_id, price, stock_quantity, sku, image_url, status, featured, care_instructions, tags) 
VALUES ('Product Name', 'product-slug', 'Full description', 'Short desc', 1, 19.99, 50, 'SKU-001', 'https://image-url.jpg', 'active', 1, 'Care tips', 'tag1,tag2');
```

Category IDs: 1=Plants, 2=Seeds, 3=Fertilizers, 4=Pots, 5=Tools, 6=Pesticides
