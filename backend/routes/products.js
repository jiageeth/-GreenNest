/**
 * Products API Routes
 */
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Categories must be before /:id to avoid "categories" being captured as id
router.get('/categories/all', async (req, res) => {
  try {
    const [categories] = await db.execute('SELECT * FROM categories ORDER BY name ASC');
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/category/:slug', async (req, res) => {
  try {
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p INNER JOIN categories c ON p.category_id = c.id
       WHERE c.slug = ? AND p.status = 'active'
       ORDER BY p.featured DESC, p.created_at DESC`,
      [req.params.slug]
    );
    res.json({ success: true, count: products.length, category: req.params.slug, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { category, search, featured, status = 'active' } = req.query;
    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      INNER JOIN categories c ON p.category_id = c.id
      WHERE p.status = ?
    `;
    const params = [status];
    if (category) { query += ' AND c.slug = ?'; params.push(category); }
    if (featured === 'true') { query += ' AND p.featured = 1'; }
    if (search) {
      query += ' AND (p.name LIKE ? OR p.description LIKE ? OR p.tags LIKE ?)';
      const term = '%' + search + '%';
      params.push(term, term, term);
    }
    query += ' ORDER BY p.featured DESC, p.created_at DESC';
    const [products] = await db.execute(query, params);
    res.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Seasonal suggestions endpoint - MUST come before /:id route
router.get('/seasonal/suggestions', async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    let season = 'spring';
    
    // Determine season based on current month
    if (currentMonth >= 3 && currentMonth <= 5) {
      season = 'spring';
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      season = 'summer';
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      season = 'autumn';
    } else {
      season = 'winter';
    }
    
    // Get featured plants based on season tags
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p 
       INNER JOIN categories c ON p.category_id = c.id
       WHERE p.status = 'active' AND p.featured = 1
       AND (p.tags LIKE ? OR p.tags LIKE ? OR p.tags LIKE ?)
       ORDER BY RAND() LIMIT 6`,
      [`%${season}%`, '%indoor%', '%outdoor%']
    );
    
    res.json({ 
      success: true, 
      season: season, 
      count: products.length, 
      data: products 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Product by ID - comes after specific routes like /seasonal/suggestions
router.get('/:id', async (req, res) => {
  try {
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p INNER JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? AND p.status = 'active'`,
      [req.params.id]
    );
    if (!products.length) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: products[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Product by slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const [products] = await db.execute(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p INNER JOIN categories c ON p.category_id = c.id
       WHERE p.slug = ? AND p.status = 'active'`,
      [req.params.slug]
    );
    if (!products.length) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, data: products[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
