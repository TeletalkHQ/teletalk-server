import http from "http";
import { Server } from "socket.io";

import { clientStatusStore } from "~/classes/ClientStatusStore";

import { customMethods } from "./custom/methods";
import { registerEvents } from "./events";
import { registerMiddlewares } from "./middlewares";

type HttpServer = http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
>;

export const createSocketServer = async (httpServer: HttpServer) => {
  const io = new Server(httpServer, {
    cors: {
      credentials: true,
      origin: true,
    },
  });

  await clientStatusStore.removeAll();
  // await authClientStore.removeAll();

  io.on("connection", (socket) => {
    socket.io = io;

    socket.customOn = customMethods.registerCustomOn(socket);
    socket.customUse = customMethods.registerCustomUse(socket);

    registerMiddlewares(socket);

    registerEvents(socket);
  });

  return io;
};
