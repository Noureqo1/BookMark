const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      headers: {
        'Accept': 'audio/mpeg',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    // Forward the content type
    res.set('Content-Type', response.headers['content-type']);
    
    // Pipe the response stream
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch resource' });
  }
});

module.exports = router;
