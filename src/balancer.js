const net = require("net");
const logger = require("./logger");

function createBalancer(pool, port) {
  const server = net.createServer((clientSocket) => {
    const target = pool.next();

    if (!target) {
      logger.error("No healthy servers available");
      clientSocket.end();
      return;
    }

    logger.info(`Routing to ${target.host}:${target.port}`);

    const serverSocket = new net.Socket();

    serverSocket.connect(target.port, target.host, () => {
      clientSocket.pipe(serverSocket);
      serverSocket.pipe(clientSocket);
    });

    serverSocket.on("error", (err) => {
      logger.error(`Server socket error: ${err.message}`);
      pool.markUnhealthy(target);
      clientSocket.end();
    });

    clientSocket.on("error", (err) => {
      logger.error(`Client socket error: ${err.message}`);
    });

    clientSocket.on("close", () => {
      pool.release(target);
      serverSocket.destroy();
    });

    serverSocket.on("close", () => {
      clientSocket.destroy();
    });
  });

  server.listen(port, () => {
    logger.info(`Load balancer listening on port ${port}`);
  });

  return server;
}

module.exports = { createBalancer };