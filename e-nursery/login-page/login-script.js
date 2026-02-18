// Open login modal on page load (for demonstration)
window.addEventListener('DOMContentLoaded', function() {
  openLoginModal();
});

function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.remove('hidden');
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
  }
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) {
    modal.classList.add('hidden');
    // Restore background scrolling
    document.body.style.overflow = 'auto';
  }
}

function openRegisterModal() {
  closeLoginModal();
  // In a real app, this would open a register modal
  // Using setTimeout to prevent immediate alert overlap if needed, 
  // but standard alert is blocking anyway.
  setTimeout(() => {
    alert('Register modal would open here');
  }, 100);
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  // In a real app, this would make an API call
  console.log('Login attempt:', { email, password });
  alert('Login functionality would be implemented here');
  
  // Close modal after successful login (simulated)
  closeLoginModal();
}

// Close modal when clicking outside the content area
document.getElementById('loginModal').addEventListener('click', function(event) {
  // If the click is on the overlay (not the modal itself), close it
  if (event.target === this) {
    closeLoginModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLoginModal();
  }
});