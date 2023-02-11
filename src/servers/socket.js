const socket = require("socket.io");

const { middlewares } = require("@/websocket/middlewares");

const { routers } = require("@/websocket/routers");

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

    socket.on("joinRoom", () => socket.join(socket.currentUserId));

    routers(socket);
  });
  return io;
};

module.exports = {
  socketServer,
};
