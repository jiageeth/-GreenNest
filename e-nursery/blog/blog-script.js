/**
 * Filters the blog posts based on the category clicked.
 * @param {string} category - The category to filter by (e.g., 'indoor', 'tips').
 * @param {HTMLElement} btnElement - The button element that was clicked (passed via 'this' in HTML).
 */
function filterPosts(category, btnElement) {
  // Update active button state
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Add active class to the clicked button
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Filter posts
  const posts = document.querySelectorAll('.blog-card');
  posts.forEach(post => {
    if (category === 'all' || post.dataset.category === category) {
      // Use empty string to revert to the element's default/CSS display property
      // This is crucial so that 'featured-post' keeps its 'display: grid' style
      post.style.display = ''; 
    } else {
      post.style.display = 'none';
    }
  });
}

// Add click handlers to blog cards (simulating navigation)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.blog-card').forEach(card => {
    card.addEventListener('click', function() {
      // In a real app, this would navigate to the blog post
      console.log('Navigate to blog post: ' + this.querySelector('h3').innerText);
    });
  });
});