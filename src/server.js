const https = require("https");

const { trier } = require("utility-store/src/classes/Trier");

//! Require this module before requiring internal modules!
require("module-alias/register");
require("@/others/startupRequirements").startupRequirements();

const { appConfigs } = require("@/classes/AppConfigs");

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/functions/utilities/utilities");

const { ioFunctions } = require("@/socket/io");

const server = https.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { NODE_ENV } = envManager.getAllLocalEnvironments();

const EXACT_PORT = envManager.getEnvironment(`PORT_${NODE_ENV.toUpperCase()}`);

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

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

const expressServer = () => {
  server.listen(EXACT_PORT, serverListenerCb);
};

const tryToStartHttpServer = () => {
  socketServer();
  expressServer();
};

const startServer = async () => {
  await appConfigs.runConfigs();
  trier(startServer.name).try(tryToStartHttpServer).catch(crashServer);
};

startServer();

module.exports = { app, server };
