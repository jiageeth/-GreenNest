/**
 * GreenNest Register page - form validation and submit
 */
function handleRegister(event) {
  event.preventDefault();

  var fullName = document.getElementById('fullName').value.trim();
  var email = document.getElementById('email').value.trim();
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  // In a real app you would send this to your backend
  console.log('Register:', { fullName: fullName, email: email });
  alert('Registration successful! Welcome to GreenNest.');

  // Optional: redirect to home or login
  window.location.href = '../Home/1st.html';
}
