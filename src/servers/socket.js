const { middlewares } = require("@/socket/middlewares");
const socket = require("socket.io");

const socketServer = (httpServer) => {
  const io = new socket.Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.use((_event, next) => middlewares.auth(socket, next));

    socket.use((event, next) => {
      console.log("event:::", event);
      next();
    });

    socket.on("ping", () => {
      socket.emit("pong", "YAY!");
    });

    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("authorize-me", (userId) => {
      console.log("userId:::", userId);
    });

    socket.on("logout", () => {
      socket.handshake.headers.cookie = undefined;
    });
  });

  return io;
};

module.exports = { socketServer };
