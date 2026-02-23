/**
 * GreenNest E-Nursery Backend Server
 */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productsRoutes = require('./routes/products');
app.use('/api/products', productsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GreenNest API is running' });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GreenNest API',
    endpoints: {
      products: '/api/products',
      categories: '/api/products/categories/all',
      health: '/api/health'
    }
  });
});

app.listen(PORT, () => {
  console.log('GreenNest API running on http://localhost:' + PORT);
});
