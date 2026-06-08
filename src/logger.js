const levels = { INFO: "INFO", WARN: "WARN", ERROR: "ERROR" };

function log(level, message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

module.exports = {
  info: (msg) => log(levels.INFO, msg),
  warn: (msg) => log(levels.WARN, msg),
  error: (msg) => log(levels.ERROR, msg),
};