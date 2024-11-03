// app/app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Kubernetes Showcase App!');
});

// Health check endpoint (optional)
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

