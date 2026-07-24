const express = require('express');
const httpProxy = require('express-http-proxy');
const url = require('url');
const https = require('https');
const http = require('http');

const app = express();

// Middleware to parse incoming requests
app.use(express.static('public'));
app.use(express.json());

// Store target URL from form submission
let targetUrl = '';

// Homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Set target URL endpoint
app.post('/api/set-target', (req, res) => {
  let { url: targetURL } = req.body;
  
  // Ensure URL has protocol
  if (!targetURL.startsWith('http://') && !targetURL.startsWith('https://')) {
    targetURL = 'https://' + targetURL;
  }
  
  targetUrl = targetURL;
  res.json({ success: true, target: targetUrl });
});

// Main proxy route - handles all requests
app.use('/proxy/*', (req, res, next) => {
  if (!targetUrl) {
    return res.status(400).json({ error: 'No target URL set' });
  }

  // Extract the path and query
  const fullPath = req.originalUrl.replace('/proxy/', '');
  const proxyTarget = targetUrl + (fullPath ? '/' + fullPath : '');

  // Configure proxy options
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Cache-Control': 'max-age=0',
    },
    changeOrigin: true,
    followRedirects: true,
  };

  // Use express-http-proxy to forward the request
  httpProxy(proxyTarget, {
    ...options,
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      // Modify response headers to prevent caching issues
      userRes.set('Access-Control-Allow-Origin', '*');
      userRes.set('Access-Control-Allow-Methods', '*');
      userRes.set('Access-Control-Allow-Headers', '*');
      
      return proxyResData;
    },
    proxyReqPathResolver: () => {
      return new URL(proxyTarget).pathname + (new URL(proxyTarget).search || '');
    },
  })(req, res, next);
});

// Handle redirects
app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url;
  if (!redirectUrl) {
    return res.status(400).json({ error: 'No redirect URL provided' });
  }
  res.redirect('/proxy/' + redirectUrl);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Null Web Proxy running on http://localhost:${PORT}`);
  console.log(`📡 Access proxy at: http://localhost:${PORT}/proxy/*`);
});