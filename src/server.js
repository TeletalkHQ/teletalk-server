const http = require("http");

const { trier } = require("utility-store/src/classes/Trier");

//! Require this module before requiring internal modules!
require("module-alias/register");
require("@/others/startupRequirements").startupRequirements();

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/functions/utilities/utilities");

const { ioFunctions } = require("@/socket/io");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(`${NODE_ENV.toUpperCase()}_PORT`);

const serverListenerCb = () => {
  logger.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const socketServer = () => {
  ioFunctions.sio(server);

  ioFunctions.io.on("connection", (socket) => {
    logger.log("User connected.");

    logger.log(socket.id);

    socket.on("disconnect", (...params) => {
      logger.log(`${socket.id} disconnected`);

      logger.log(params);
    });
  });
};

const expressServer = () => {
  server.listen(EXACT_PORT, serverListenerCb);
};

const tryToStartHttpServer = () => {
  socketServer();
  expressServer();
};

const startServer = async () => {
  trier(startServer.name).try(tryToStartHttpServer).catch(crashServer);
};

startServer();

module.exports = { app, server };
