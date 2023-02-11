const socket = require("socket.io");

const { middlewares } = require("@/websocket/middlewares");

const { events } = require("@/websocket/events");

const socketServer = (httpServer) => {
  const io = new socket.Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.use((_event, next) => middlewares.auth(socket, next));

    socket.use((_event, next) =>
      middlewares.checkCurrentUserStatus(socket, next)
    );
    socket.use((_event, next) => middlewares.attachCurrentUserId(socket, next));

    events(socket);
  });
  return io;
};

module.exports = {
  socketServer,
};
