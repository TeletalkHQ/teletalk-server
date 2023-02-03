require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv").requireDotenv();
require("@/../requirements").mainServer();

const { envManager } = require("@/classes/EnvironmentManager");

const { expressServer } = require("@/servers/express");
const { httpServer } = require("@/servers/http");
const { socketServer } = require("@/servers/socket");

const { NODE_ENV, PORT, SELF_EXEC } = envManager.getAllLocalEnvironments();

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

if (SELF_EXEC) runner();

module.exports = {
  runner,
  servers: {
    expressServer,
    httpServer,
    socketServer,
  },
};
