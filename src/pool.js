class ServerPool {
  constructor(servers) {
    this.servers = servers.map((s) => ({ ...s, healthy: true, connections: 0 }));
    this.index = 0;
  }

  next() {
    const healthy = this.servers.filter((s) => s.healthy);
    if (healthy.length === 0) return null;
    const server = healthy[this.index % healthy.length];
    this.index = (this.index + 1) % healthy.length;
    server.connections++;
    return server;
  }

  release(server) {
    server.connections = Math.max(0, server.connections - 1);
  }

  markUnhealthy(server) {
    server.healthy = false;
  }

  markHealthy(server) {
    server.healthy = true;
  }

  getAll() {
    return this.servers;
  }
}

module.exports = { ServerPool };