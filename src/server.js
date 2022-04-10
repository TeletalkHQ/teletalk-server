const http = require("http");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", "environments", "main.env"),
});

//* No more relative path!
//! Require this package before requiring internal modules!
require("module-alias/register");

//! Require this module before requiring internal modules!
require("~/variables/globalVariables");

const {
  connectDatabase,
} = require("~/variables/configs/databaseConfigs/connectDatabase");

const { app } = require("~/app");
const { ioFunctions } = require("~/socket/io");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { LOCAL_PORT, PORT, NODE_ENV } = process.env;

const EXACT_PORT = PORT || LOCAL_PORT;

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
