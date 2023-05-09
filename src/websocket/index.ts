import http from "http";

import { Server } from "socket.io";

import { customMethods } from "@/websocket/custom/methods";

import { registerEvents } from "@/websocket/events";

import { registerMiddlewares } from "@/websocket/middlewares";

type HttpServer = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

const websocketServer = (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  io.on("connection", (socket) => {
    socket.io = io;

    socket.customEmit = customMethods.registerCustomEmit(socket);
    socket.customOn = customMethods.registerCustomOn(socket);
    socket.customUse = customMethods.registerCustomUse(socket);

    registerMiddlewares(socket);

    registerEvents(socket);
  });

  return io;
};

export { websocketServer };
