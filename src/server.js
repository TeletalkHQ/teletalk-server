//* No more relative path!
//! Require this module before requiring anything!
require("module-alias/register");

const http = require("http");

const { app } = require("@/app");
const { ioFunctions } = require("@/socket/io");

const { databaseConnector } = require("@/configs/databaseConnector");
const { crashServer } = require("@/functions/utilities/utils");
const { envManager } = require("@/functions/utilities/EnvironmentManager");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { NODE_ENV, PORT } = envManager.getAllEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(`${NODE_ENV.toUpperCase()}_PORT`);

const serverListenerCb = () => {
  logger.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const startServer = async () => {
  try {
    await databaseConnector();

    ioFunctions.sio(server);

    ioFunctions.io.on("connection", (socket) => {
      logger.log("User connected.");

      logger.log(socket.id);

      socket.on("disconnect", (...params) => {
        logger.log(`${socket.id} disconnected`);

        logger.log(params);
      });
    });

    server.listen(EXACT_PORT, serverListenerCb);
  } catch (error) {
    crashServer(error);
  }
};

startServer();
