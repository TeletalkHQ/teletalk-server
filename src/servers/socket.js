const socket = require("socket.io");

// const { ioFunctions } = require("@/socket/io");

const socketServer = (httpServer) => {
  // ioFunctions.sio(server);
  // ioFunctions.io.on("connection", (socket) => {
  //   logger.info("User connected.");
  //   logger.info(socket.id);
  //   socket.on("disconnect", (...params) => {
  //     logger.info(`${socket.id} disconnected`);
  //     logger.info(params);
  //   });
  // });
  return new socket.Server(httpServer, {
    cors: {
      origin: "*",
    },
  });
};

module.exports = { socketServer };

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });
