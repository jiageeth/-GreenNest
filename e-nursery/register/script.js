// Open register modal on page load (for demonstration)
window.addEventListener('DOMContentLoaded', function() {
  // Check if we should auto-open based on specific logic, currently opens by default
  openRegisterModal();
});

function openRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

function closeRegisterModal() {
  const modal = document.getElementById('registerModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Restore background scrolling
  }
}

function openLoginModal() {
  closeRegisterModal();
  // In a real app, this would open a login modal
  // For now, we simulate a slight delay or action
  setTimeout(() => {
    alert('Login modal would open here');
  }, 100);
}

function handleRegister(event) {
  event.preventDefault();
  
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  
  // Validate passwords match
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }
  
  // In a real app, this would make an API call
  console.log('Register attempt:', { fullName, email, password });
  alert('Registration successful! Welcome to GreenNest!');
  
  // Close modal after successful registration
  closeRegisterModal();
}

// Close modal when clicking outside
const modalOverlay = document.getElementById('registerModal');
if (modalOverlay) {
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === this) {
      closeRegisterModal();
    }
  });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeRegisterModal();
  }
});