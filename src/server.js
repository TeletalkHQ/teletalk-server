//* No more relative path!
//! Require this module before requiring anything!
require("module-alias/register");

const http = require("http");

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");
const { trier } = require("utility-store/src/classes/Trier");

const { crashServer } = require("@/functions/utilities/utils");

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

const tryStartServer = () => {
  socketServer();
  expressServer();
};

const startServer = async () => {
  trier(startServer.name).try(tryStartServer).catch(crashServer);
};

startServer();
