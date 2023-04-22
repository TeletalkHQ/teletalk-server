import { Socket } from "socket.io";
import { trier } from "simple-trier";

import {
  CustomUse,
  NativeError,
  SocketEvent,
  SocketMiddleware,
  SocketNext,
  SocketResponse,
} from "@/types";

//TODO: Rename to registerCustomUse or registerCustomMethods
const customUse = (socket: Socket) => {
  return ((middleware) => {
    socket.use(async (event: SocketEvent, next) => {
      await trier(customUse.name)
        .tryAsync(tryBlock, socket, next, event, middleware)
        .catch(catchBlock, socket, event)
        .runAsync();
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
  logger.debug("error in mld:", error);

  const response: SocketResponse = {
    data: { errors: { [error.key]: error } },
    ok: false,
  };

  const cb = event[2];

  if (typeof cb === "function") {
    return cb(response);
  } else socket.emit("error", response);
};

export { customUse };
