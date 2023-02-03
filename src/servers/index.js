const { envManager } = require("@/classes/EnvironmentManager");

const { httpServer } = require("@/servers/http");
const { expressServer } = require("@/servers/express");
const { socketServer } = require("@/servers/socket");

const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const runner = () => {
  const http = httpServer(expressServer);
  http.listen(EXACT_PORT, serverListenerCb);
  socketServer(http);
};

module.exports = {
  runner,
  servers: {
    expressServer,
    httpServer,
    socketServer,
  },
};
