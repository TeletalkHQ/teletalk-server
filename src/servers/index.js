const cluster = require("cluster");
const os = require("os");

require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv");

const { envManager } = require("@/classes/EnvironmentManager");

const requirements = require("@/requirements");

const { expressServer } = require("@/servers/express");
const { httpServer } = require("@/servers/http");
const { socketServer } = require("@/servers/socket");

const { logEnvironments } = require("@/utilities/utilities");

const { NODE_ENV, PORT, SELF_EXEC } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const runner = async () => {
  if (cluster.isPrimary) {
    logEnvironments();
    const NUM_WORKERS = os.cpus().length;
    for (let i = 0; i < NUM_WORKERS; i++) cluster.fork();
  } else {
    await requirements.database();
    const http = httpServer(expressServer);
    http.listen(EXACT_PORT, serverListenerCb);
    socketServer(http);
  }
};

if (SELF_EXEC) runner();

module.exports = {
  runner,
  servers: {
    expressServer,
    httpServer,
    socketServer,
  },
};
