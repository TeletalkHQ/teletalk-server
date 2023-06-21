import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  CustomUse,
  NativeError,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
  SocketResponse,
} from "~/types";

const registerCustomUse = (socket: Socket) => {
  return ((middleware) => {
    socket.use(async (event: SocketEvent, next) => {
      await trier("socket.customUse")
        .async()
        .try(tryBlock, socket, next, event, middleware)
        .catch(catchBlock, socket, event)
        .run();
    });
  }) as CustomUse;
};

const tryBlock = async (
  socket: Socket,
  next: SocketNext,
  event: SocketEvent,
  middleware: SocketMiddleware
) => {
  await middleware(socket, next, event);
};

const catchBlock = (error: NativeError, socket: Socket, event: SocketEvent) => {
  logger.debug(`error in middleware:${event}`, error);

  const response: SocketResponse = {
    data: {},
    errors: [error],
    ok: false,
  };

  const successResponseCallback = event[2];

  if (typeof successResponseCallback === "function")
    successResponseCallback(response);

  socket.emit("error", response);
};

export { registerCustomUse };
