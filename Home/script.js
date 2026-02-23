// GreenNest Home Page Script

console.log("GreenNest script loaded successfully!");

const API_BASE = 'http://localhost:3000/api/products';

// Get current season
function getCurrentSeason() {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return 'Spring';
  if (month >= 6 && month <= 8) return 'Summer';
  if (month >= 9 && month <= 11) return 'Autumn';
  return 'Winter';
}

// Load seasonal suggestions
async function loadSeasonalSuggestions() {
  try {
    const response = await fetch(`${API_BASE}/seasonal/suggestions`);
    const json = await response.json();
    
    if (json.success && json.data.length > 0) {
      document.getElementById('seasonName').textContent = json.season.charAt(0).toUpperCase() + json.season.slice(1);
      renderSeasonalProducts(json.data);
    } else {
      showSeasonalError('No seasonal suggestions available');
    }
  } catch (error) {
    console.error('Error loading seasonal suggestions:', error);
    showSeasonalError('Could not load seasonal suggestions');
  }
}

// Render seasonal products
function renderSeasonalProducts(products) {
  const grid = document.getElementById('seasonalGrid');
  
  if (!products || products.length === 0) {
    grid.innerHTML = '<p class="no-products">No seasonal suggestions available</p>';
    return;
  }
  
  grid.innerHTML = products.map(p => `
    <a href="../plant_details/index.html?id=${p.id}" class="seasonal-card-link">
      <div class="seasonal-card">
        <div class="seasonal-card-image">
          <img src="${p.image_url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80'}" 
               alt="${p.name}" 
               onerror="this.src='https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80'">
          <span class="seasonal-badge">${p.category_name || 'Plant'}</span>
        </div>
        <div class="seasonal-card-content">
          <h3>${p.name}</h3>
          <p class="seasonal-description">${(p.short_description || p.description || '').slice(0, 60)}...</p>
          <div class="seasonal-footer">
            <span class="seasonal-price">$${Number(p.price).toFixed(2)}</span>
            <button class="seasonal-cart-btn" onclick="addToCart(event)">Add to Cart</button>
          </div>
        </div>
      </div>
    </a>
  `).join('');
  
  // Add event listeners for cart buttons
  document.querySelectorAll('.seasonal-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      alert('Product added to cart!');
    });
  });
}

// Show error message
function showSeasonalError(message) {
  const grid = document.getElementById('seasonalGrid');
  grid.innerHTML = `<p class="seasonal-error">${message}</p>`;
}

// Example function triggered by the Register button
function handleRegister() {
  alert("Welcome to GreenNest! Registration form coming soon.");
}

// Add to cart function
function addToCart(event) {
  event.preventDefault();
  event.stopPropagation();
  const card = event.target.closest('.seasonal-card');
  const name = card.querySelector('h3').textContent;
  alert(`Added "${name}" to cart!`);
}

// Load seasonal suggestions on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSeasonalSuggestions);
} else {
  loadSeasonalSuggestions();
}