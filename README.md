# 🌐 Null Web Proxy

A powerful, production-ready web proxy that allows you to access any website without restrictions.

## Features

✅ **Full Website Support** - Works with YouTube, Roblox, and other major sites
✅ **No iframe Detection** - Uses proper HTTP/HTTPS proxying
✅ **WebSocket Support** - Real-time communication for modern apps
✅ **Cookie Management** - Sessions and authentication work properly
✅ **Header Rewriting** - Bypasses common anti-proxy detection
✅ **Streaming Support** - Video and media streaming fully functional
✅ **Mobile Friendly** - Responsive design for all devices

## Installation

```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.

## Usage

1. Enter any website URL in the search box
2. Click "Access"
3. Browse the website freely through the proxy

## Supported Websites

- YouTube
- Roblox
- Reddit
- Twitter/X
- Instagram
- Discord
- And most other modern websites!

## How It Works

Instead of using iframes (which can be detected), Null uses a true HTTP/HTTPS proxy that:
- Rewrites all URLs transparently
- Manages cookies and sessions
- Forwards all requests/responses through the server
- Bypasses common anti-proxy detection methods

## Deployment

### Railway
Connect your GitHub repo to [Railway.app](https://railway.app) for instant deployment!

### Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

## License

MIT