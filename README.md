# Build Your Own Load Balancer

A TCP load balancer built in Node.js — round-robin scheduling, automatic health checks, and real-time connection tracking.

## How it works

A load balancer sits in front of multiple servers and distributes incoming connections across them. This project implements that:

- Accepts incoming TCP connections and routes them to backend servers
- Distributes requests using round-robin scheduling
- Runs health checks every 5 seconds to detect server failures
- Automatically removes unhealthy servers from rotation
- Restores recovered servers back into the pool
- Logs pool status and connection counts in real time

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

Start backend servers:

```bash
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 1')).listen(3001);"
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 2')).listen(3002);"
node -e "const http = require('http'); http.createServer((req, res) => res.end('Server 3')).listen(3003);"
```

Start the load balancer:

```bash
node src/server.js
```

Test it:

```bash
curl http://localhost:8080
```

## Tech

- Node.js
- `net` module (raw TCP)
- No external dependencies
