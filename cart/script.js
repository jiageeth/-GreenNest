/**
 * GreenNest Cart - loads cart from localStorage, updates UI and totals
 * Cart item shape: { id, name, price, image, quantity }
 */
(function () {
  const CART_KEY = 'greennest_cart';

  function getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  function renderCart() {
    const cart = getCart();
    const listEl = document.getElementById('cartItemsList');
    const emptyEl = document.getElementById('cartEmpty');
    const summaryEl = document.getElementById('orderSummary');

    listEl.innerHTML = '';

    if (cart.length === 0) {
      emptyEl.classList.remove('hidden');
      summaryEl.classList.add('hidden');
      return;
    }

    emptyEl.classList.add('hidden');
    summaryEl.classList.remove('hidden');

    let subtotal = 0;

    cart.forEach(function (item, index) {
      const lineTotal = item.price * (item.quantity || 1);
      subtotal += lineTotal;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.dataset.index = index;
      div.innerHTML =
        '<img class="cart-item-image" src="' + escapeAttr(item.image) + '" alt="' + escapeAttr(item.name) + '">' +
        '<div class="cart-item-details">' +
          '<div class="cart-item-name">' + escapeHtml(item.name) + '</div>' +
          '<div class="cart-item-price">' + formatPrice(item.price) + ' each</div>' +
          '<div class="cart-item-actions">' +
            '<div class="quantity-control">' +
              '<button type="button" class="qty-minus" aria-label="Decrease quantity">−</button>' +
              '<span class="qty-value">' + (item.quantity || 1) + '</span>' +
              '<button type="button" class="qty-plus" aria-label="Increase quantity">+</button>' +
            '</div>' +
            '<span class="cart-item-total">' + formatPrice(lineTotal) + '</span>' +
            '<button type="button" class="btn-remove">Remove</button>' +
          '</div>' +
        '</div>';
      listEl.appendChild(div);
    });

    document.getElementById('subtotalValue').textContent = formatPrice(subtotal);
    document.getElementById('totalValue').textContent = formatPrice(subtotal);

    // Event delegates
    listEl.querySelectorAll('.qty-minus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const row = btn.closest('.cart-item');
        const idx = parseInt(row.dataset.index, 10);
        updateQuantity(idx, -1);
      });
    });
    listEl.querySelectorAll('.qty-plus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const row = btn.closest('.cart-item');
        const idx = parseInt(row.dataset.index, 10);
        updateQuantity(idx, 1);
      });
    });
    listEl.querySelectorAll('.btn-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const row = btn.closest('.cart-item');
        const idx = parseInt(row.dataset.index, 10);
        removeItem(idx);
      });
    });
  }

  function updateQuantity(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;
    const qty = (cart[index].quantity || 1) + delta;
    if (qty < 1) {
      cart.splice(index, 1);
    } else {
      cart[index].quantity = qty;
    }
    saveCart(cart);
    renderCart();
  }

  function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
  }

  function formatPrice(num) {
    return '$' + Number(num).toFixed(2);
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/"/g, '&quot;');
  }

  function init() {
    renderCart();
    document.getElementById('btnCheckout').addEventListener('click', function () {
      var cart = getCart();
      if (cart.length === 0) return;
      alert('Checkout is coming soon! Your cart total: ' + document.getElementById('totalValue').textContent);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
