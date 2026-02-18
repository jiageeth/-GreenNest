const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const typingIndicator = document.getElementById('typingIndicator');

// Sample responses for the chatbot
const responses = {
  greeting: [
    "Hello! I'm here to help with your plant care questions. What plant are you having trouble with?",
    "Hi! Let's diagnose your plant issue. Which plant needs help today?",
    "Hey there! Tell me about your plant - what symptoms are you seeing?"
  ],
  yellowing: [
    "Yellow leaves can indicate overwatering, underwatering, or nutrient deficiency. When did you last water your plant?",
    "Yellowing leaves are common. Let me help you figure out the cause. Is the soil wet or dry?"
  ],
  browning: [
    "Brown leaves often mean underwatering, low humidity, or too much direct sunlight. Where is your plant located?",
    "Brown tips usually indicate low humidity or water quality issues. Do you use tap water?"
  ],
  default: [
    "I see. Can you tell me more about the symptoms you're observing?",
    "That's helpful information. What type of plant is it?",
    "Thanks for sharing. How long have you had this plant?"
  ]
};

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Add user message
  addUserMessage(message);
  userInput.value = '';

  // Show typing indicator
  typingIndicator.style.display = 'flex';
  scrollToBottom();

  // Simulate bot response delay
  setTimeout(() => {
    typingIndicator.style.display = 'none';
    addBotResponse(message);
  }, 1500);
}

function addUserMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  messageDiv.style.flexDirection = 'row-reverse';
  messageDiv.innerHTML = `
    <div class="message-content" style="background-color: #2e7d32; color: white; border-top-left-radius: 15px; border-top-right-radius: 5px;">
      <p>${message}</p>
    </div>
  `;
  chatMessages.insertBefore(messageDiv, typingIndicator);
  scrollToBottom();
}

function addBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  let response;

  if (lowerMessage.includes('hi') || lowerMessage.includes('hello') || lowerMessage.includes('hey')) {
    response = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  } else if (lowerMessage.includes('yellow')) {
    response = responses.yellowing[Math.floor(Math.random() * responses.yellowing.length)];
  } else if (lowerMessage.includes('brown')) {
    response = responses.browning[Math.floor(Math.random() * responses.browning.length)];
  } else {
    response = responses.default[Math.floor(Math.random() * responses.default.length)];
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  messageDiv.innerHTML = `
    <div class="message-avatar">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8 20C19 20 22 3 22 3C21 5 14 5.25 9 6.25C4 7.25 2 11.5 2 13.5C2 15.5 3.75 17.25 3.75 17.25C7 8 17 8 17 8Z" fill="#2e7d32"/>
      </svg>
    </div>
    <div class="message-content">
      <p>${response}</p>
    </div>
  `;
  chatMessages.insertBefore(messageDiv, typingIndicator);
  scrollToBottom();
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function restartChat() {
  // Clear all messages except the initial one
  const messages = chatMessages.querySelectorAll('.message');
  messages.forEach((msg, index) => {
    if (index > 0) msg.remove();
  });
  userInput.value = '';
}

// Focus input on load
userInput.focus();