const http = require("http");

const { app } = require("@/servers/app");

const { envManager } = require("@/classes/EnvironmentManager");

const httpServer = http.createServer(app);

const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};
const expressServer = () => {
  httpServer.listen(EXACT_PORT, serverListenerCb);
};

const startServers = async () => {
  expressServer();
};

startServers();

module.exports = {
  app,
  server: httpServer,
};
