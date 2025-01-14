const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001;

app.get('/api/donations', async (req, res) => {
  try {
    const response = await axios.get('https://script.google.com/macros/s/AKfycbyEoPvDq30dFkK2rw1H-a9zw-xKFMwS8itEJjL00p4dEn7Kt0LKdgC1x0lzK6avbfB5/exec');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
