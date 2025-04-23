const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect root to example-embed.html
app.get('/', (req, res) => {
  res.redirect('/example-embed.html');
});

// For all other routes, try to serve the file from dist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'example-embed.html'));
});

// Export the Express app for Vercel
module.exports = app;
