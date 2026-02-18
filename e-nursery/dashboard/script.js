function viewStore() {
  window.location.href = '/';
}

function signOut() {
  if (confirm('Are you sure you want to sign out?')) {
    alert('Signing out...');
    window.location.href = '/';
  }
}

function switchTab(tab) {
  // Remove active class from all buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Add active class to clicked button
  document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

  // Hide all content sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });

  // Show selected content section
  document.getElementById(`${tab}-section`).classList.add('active');
}

// Plants functions
function addPlant() {
  alert('Add plant form would open here');
}

function editPlant(id) {
  alert(`Edit plant ${id}`);
}

function deletePlant(id) {
  if (confirm('Are you sure you want to delete this plant?')) {
    alert(`Plant ${id} deleted`);
  }
}

// Orders functions
function updateOrderStatus(orderId, status) {
  console.log(`Order ${orderId} status updated to: ${status}`);
  alert(`Order ${orderId} status updated to: ${status}`);
}

// Q&A functions
function addQA() {
  alert('Add Q&A form would open here');
}

function editQA(id) {
  alert(`Edit Q&A entry ${id}`);
}

function deleteQA(id) {
  if (confirm('Are you sure you want to delete this Q&A entry?')) {
    alert(`Q&A entry ${id} deleted`);
    event.target.closest('.qa-entry').remove();
  }
}