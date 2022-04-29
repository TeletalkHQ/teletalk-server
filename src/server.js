const http = require("http");

//* No more relative path!
//! Require this package before requiring internal modules
require("module-alias/register");

const { app } = require("~/app");
const { ioFunctions } = require("~/socket/io");
const { connectDatabase } = require("~/configs/connectDatabase");
const { getAllEnvironments } = require("./functions/utilities/utilsNoDeps");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { DEVELOPMENT_PORT, NODE_ENV, PORT, PRODUCTION_PORT, TEST_PORT } =
  getAllEnvironments();

const EXACT_PORT = PORT || PRODUCTION_PORT || TEST_PORT || DEVELOPMENT_PORT;

const serverListenerCb = () => {
  logger.log(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const startServer = async () => {
  try {
    await connectDatabase();

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
    process.exit(1);
  }
};

startServer();
