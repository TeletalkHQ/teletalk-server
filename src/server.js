const http = require("http");

const { trier } = require("utility-store/src/classes/Trier");

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/utilities/utilities");

const { ioFunctions } = require("@/socket/io");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const socketServer = () => {
  ioFunctions.sio(server);
  ioFunctions.io.on("connection", (socket) => {
    logger.info("User connected.");
    logger.info(socket.id);
    socket.on("disconnect", (...params) => {
      logger.info(`${socket.id} disconnected`);
      logger.info(params);
    });
  });
};

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};
const expressServer = () => {
  server.listen(EXACT_PORT, serverListenerCb);
};

const tryToStartServers = async () => {
  socketServer();
  expressServer();
};

const startServers = async () => {
  trier(startServers.name).try(tryToStartServers).catch(crashServer);
};

startServers();

module.exports = {
  app,
  server,
};
