![CI](https://github.com/Hanningtone03/build-your-own-load-balancer/actions/workflows/ci.yml/badge.svg)

# Build Your Own Load Balancer

A TCP load balancer in Node.js; round-robin scheduling, health checks, connection tracking.

## How it works

Incoming TCP connections are accepted and proxied to a pool of backend servers in round-robin order. A health check loop runs every 5 seconds, removing dead servers and restoring recovered ones automatically.

## Project structure

```
src/
├── server.js
├── balancer.js
├── pool.js
├── healthcheck.js
└── logger.js
```

## Running locally

```bash
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 1')).listen(3001);"
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 2')).listen(3002);"
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 3')).listen(3003);"
node src/server.js
```

```bash
curl http://localhost:8080
```

## Tech

- Node.js
- `net` module
- No external dependencies
