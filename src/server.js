const { ServerPool } = require("./pool");
const { createBalancer } = require("./balancer");
const { startHealthChecks } = require("./healthcheck");
const logger = require("./logger");

const SERVERS = [
  { host: "127.0.0.1", port: 3001 },
  { host: "127.0.0.1", port: 3002 },
  { host: "127.0.0.1", port: 3003 },
];

const BALANCER_PORT = 8080;
const HEALTH_CHECK_INTERVAL = 5000;

const pool = new ServerPool(SERVERS);

startHealthChecks(pool, HEALTH_CHECK_INTERVAL);

createBalancer(pool, BALANCER_PORT);

logger.info(`Starting load balancer with ${SERVERS.length} backend servers`);

setInterval(() => {
  const status = pool.getAll().map(
    (s) => `${s.host}:${s.port} — ${s.healthy ? "healthy" : "down"} — ${s.connections} connections`
  );
  logger.info("Pool status:\n" + status.join("\n"));
}, 10000);