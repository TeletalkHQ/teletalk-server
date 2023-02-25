import socket from "socket.io";

import { middlewares } from "@/websocket/middlewares";

import { routers } from "@/websocket/events";
import { customMethods } from "@/websocket/custom/methods";

const websocketServer = (httpServer) => {
  const io = new socket.Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.customUse = customMethods.use(socket);
    socket.customOn = customMethods.on(socket);
    socket.customEmit = customMethods.emit(socket);

    socket.customUse(middlewares.checkEventAvailability);
    socket.customUse(middlewares.auth);
    socket.customUse(middlewares.checkDataFields);
    socket.customUse(middlewares.checkCurrentUserStatus);
    socket.customUse(middlewares.attachCurrentUserId);

    routers(socket, io);
  });
  return io;
};

export { websocketServer };
