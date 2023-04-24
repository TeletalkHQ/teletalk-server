import http from "http";

import { Server } from "socket.io";

import { customMethods } from "@/websocket/custom/methods";

import { registerRoutes } from "@/websocket/events";

import { middlewares } from "@/websocket/middlewares";
import { applyMiddlewares } from "@/websocket/middlewares/applyMiddlewares";
import { ignoreMiddlewares } from "@/websocket/middlewares/ignoreMiddlewares";

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

    socket.customUse(middlewares.checkClientIdExistence);
    socket.customUse(middlewares.attachClientId);

    socket.customUse(middlewares.checkEventAvailability);

    socket.customUse(
      //CLEANME: Use ignored routes for auth
      ignoreMiddlewares(["signIn", "getStuff"], middlewares.auth)
    );

    socket.customUse(middlewares.checkDataFields);
    socket.customUse(middlewares.dynamicValidator);

    socket.customUse(
      //CLEANME: Use ignored routes for auth
      ignoreMiddlewares(
        ["createNewUser", "getStuff", "signIn", "verify"],
        middlewares.checkCurrentUserStatus,
        middlewares.attachCurrentUserId
      )
    );

    socket.customUse(
      applyMiddlewares("verify", middlewares.verifyVerificationCode)
    );

    socket.customUse(
      applyMiddlewares(
        [
          "addBlock",
          "addContact",
          "addContactWithCellphone",
          "editContact",
          "removeBlock",
          "removeContact",
        ],
        middlewares.selfStuffCheck
      )
    );

    registerRoutes(socket);
  });

  return io;
};

export { websocketServer };
