/**
 * GreenNest Browse - Fetches products from MySQL via API
 * Uses absolute API paths to backend server
 */
const API_BASE = 'http://localhost:3000/api/products';

const categorySlugMap = {
  'All': { category: '', search: '' },
  'Indoor': { category: 'plants', search: 'indoor' },
  'Outdoor': { category: 'plants', search: 'outdoor' },
  'Seeds': { category: 'seeds', search: '' },
  'Fertilizers & Nutrients': { category: 'fertilizers', search: '' },
  'Pots & Planters': { category: 'pots-planters', search: '' },
  'Garden Tools': { category: 'garden-tools', search: '' },
  'Pesticides': { category: 'pesticides', search: '' }
};

async function fetchProducts(category, search) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (search) params.set('search', search);
  const url = API_BASE + (params.toString() ? '?' + params.toString() : '');
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

function renderProducts(products) {
  const grid = document.querySelector('.plant-grid');
  if (!grid) return;
  if (!products || products.length === 0) {
    grid.innerHTML = '<p class="no-products">No products found. Make sure the backend is running and database is seeded.</p>';
    return;
  }
  grid.innerHTML = products.map(p => `
    <a href="../plant_details/index.html?id=${p.id}" class="plant-card-link">
      <div class="plant-card">
        <span class="plant-badge">${escapeHtml(p.category_name || 'Product')}</span>
        <img src="${escapeAttr(p.image_url || '')}" alt="${escapeAttr(p.name)}" onerror="this.src='https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80'">
        <div class="plant-info">
          <h3>${escapeHtml(p.name)}</h3>
          <p>${escapeHtml(p.short_description || p.description || '').slice(0, 80)}${(p.short_description || p.description || '').length > 80 ? '...' : ''}</p>
          <div class="plant-price">$${Number(p.price).toFixed(2)}</div>
        </div>
      </div>
    </a>
  `).join('');
}

function escapeHtml(s) {
  if (!s) return '';
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}
function escapeAttr(s) {
  return escapeHtml(s || '').replace(/"/g, '&quot;');
}

async function init() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.querySelector('.search-box input');
  const grid = document.querySelector('.plant-grid');

  let currentCategory = '';
  let currentFilterSearch = '';
  let searchBoxValue = '';

  async function load() {
    try {
      grid.innerHTML = '<p class="loading">Loading products...</p>';
      const search = searchBoxValue || currentFilterSearch;
      const { data } = await fetchProducts(currentCategory, search);
      renderProducts(data);
    } catch (err) {
      grid.innerHTML = '<p class="no-products">Could not load products. Start the backend: <code>cd backend && npm install && npm start</code></p>';
    }
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const text = this.textContent.trim();
      const map = categorySlugMap[text] || { category: text.toLowerCase().replace(/\s+/g, '-'), search: '' };
      currentCategory = map.category || '';
      currentFilterSearch = map.search || '';
      load();
    });
  });

  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        searchBoxValue = searchInput.value.trim();
        load();
      }, 300);
    });
  }

  await load();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
