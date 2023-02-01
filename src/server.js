const http = require("http");
const socket = require("socket.io");

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");

const { ioFunctions } = require("@/socket/io");

const httpServer = http.createServer(app);

const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const socketServer = () => {
  // ioFunctions.sio(server);
  // ioFunctions.io.on("connection", (socket) => {
  //   logger.info("User connected.");
  //   logger.info(socket.id);
  //   socket.on("disconnect", (...params) => {
  //     logger.info(`${socket.id} disconnected`);
  //     logger.info(params);
  //   });
  // });
  const io = new socket.Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};
const expressServer = () => {
  httpServer.listen(EXACT_PORT, serverListenerCb);
};

const startServers = async () => {
  socketServer();
  expressServer();
};

startServers();

module.exports = {
  app,
  server: httpServer,
};
