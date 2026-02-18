// Quantity selector functionality
const quantityInput = document.getElementById('quantity');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');

decreaseBtn.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
});

increaseBtn.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  const maxValue = parseInt(quantityInput.max);
  if (currentValue < maxValue) {
    quantityInput.value = currentValue + 1;
  }
});

// Add to cart functionality
document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
  const quantity = quantityInput.value;
  alert(`Added ${quantity} Fiddle Leaf Fig(s) to cart!`);
});