/**
 * Product Detail - Loads product from MySQL via API
 * Uses absolute API paths to backend server
 */
const API_BASE = 'http://localhost:3000/api/products';

function getUrlParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function loadProduct() {
  const id = getUrlParam('id');
  const slug = getUrlParam('slug');
  const loading = document.getElementById('productLoading');
  const error = document.getElementById('productError');
  const content = document.getElementById('productContent');

  if (!id && !slug) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = 'No product specified. Use ?id=1 or ?slug=product-name';
    return null;
  }

  try {
    const url = id ? `${API_BASE}/${id}` : `${API_BASE}/slug/${slug}`;
    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Product not found');
    }

    loading.style.display = 'none';
    error.style.display = 'none';
    content.style.display = 'block';
    renderProduct(json.data);
    return json.data;
  } catch (err) {
    loading.style.display = 'none';
    error.style.display = 'block';
    error.textContent = err.message || 'Could not load product. Is the backend running?';
    return null;
  }
}

function renderProduct(p) {
  document.title = p.name + ' - GreenNest';
  document.getElementById('breadcrumbCategory').textContent = p.category_name || 'Products';
  document.getElementById('breadcrumbCategory').href = '../browse/index.html';
  document.getElementById('breadcrumbProduct').textContent = p.name;

  document.getElementById('productBadge').textContent = p.category_name || 'Product';
  document.getElementById('productImage').src = p.image_url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80';
  document.getElementById('productImage').alt = p.name;
  document.getElementById('productName').textContent = p.name;
  document.getElementById('productDescription').textContent = p.short_description || p.description || '';
  document.getElementById('productPrice').textContent = '$' + Number(p.price).toFixed(2);
  document.getElementById('stockInfo').textContent = (p.stock_quantity || 0) + ' in stock';

  const qtyInput = document.getElementById('quantity');
  qtyInput.max = Math.max(1, p.stock_quantity || 99);

  document.getElementById('tabDescription').textContent = p.description || p.short_description || 'No description available.';
  document.getElementById('tabCare').innerHTML = (p.care_instructions || 'No care instructions available.').replace(/\n/g, '<br>');
}

function initCart() {
  const qtyInput = document.getElementById('quantity');
  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');
  const addToCartBtn = document.getElementById('addToCart');

  decreaseBtn.addEventListener('click', () => {
    const v = parseInt(qtyInput.value, 10);
    if (v > 1) qtyInput.value = v - 1;
  });

  increaseBtn.addEventListener('click', () => {
    const v = parseInt(qtyInput.value, 10);
    const max = parseInt(qtyInput.max, 10) || 99;
    if (v < max) qtyInput.value = v + 1;
  });

  addToCartBtn.addEventListener('click', () => {
    const product = window.currentProduct;
    if (!product) return;
    const qty = parseInt(document.getElementById('quantity').value, 10) || 1;
    const item = {
      id: String(product.id),
      name: product.name,
      price: parseFloat(product.price),
      image: product.image_url,
      quantity: qty
    };
    const cart = JSON.parse(localStorage.getItem('greennest_cart') || '[]');
    const idx = cart.findIndex(i => i.id === item.id);
    if (idx >= 0) cart[idx].quantity += qty;
    else cart.push(item);
    localStorage.setItem('greennest_cart', JSON.stringify(cart));
    alert('Added ' + qty + ' to cart!');
  });
}

(async function () {
  const product = await loadProduct();
  if (product) window.currentProduct = product;
  initCart();
})();
