const net = require("net");
const logger = require("./logger");

function checkServer(server) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    const timeout = 2000;

    socket.setTimeout(timeout);

    socket.on("connect", () => {
      socket.destroy();
      resolve(true);
    });

    socket.on("error", () => {
      socket.destroy();
      resolve(false);
    });

    socket.on("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(server.port, server.host);
  });
}

function startHealthChecks(pool, interval = 5000) {
  setInterval(async () => {
    for (const server of pool.getAll()) {
      const alive = await checkServer(server);
      if (alive && !server.healthy) {
        pool.markHealthy(server);
        logger.info(`Server ${server.host}:${server.port} is back online`);
      } else if (!alive && server.healthy) {
        pool.markUnhealthy(server);
        logger.warn(`Server ${server.host}:${server.port} is down`);
      }
    }
  }, interval);
}

module.exports = { startHealthChecks };