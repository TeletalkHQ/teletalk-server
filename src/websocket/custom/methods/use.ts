import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { helpers } from "~/helpers";
import {
  CustomUse,
  NativeError,
  SocketDefaultMiddlewareEvent,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
  SocketResponse,
} from "~/types";

const registerCustomUse = (socket: Socket) => {
  return ((middleware) => {
    socket.use(
      async (socketMiddlewareEvent: SocketDefaultMiddlewareEvent, next) => {
        await trier("socket.customUse")
          .async()
          .try(tryBlock, socket, next, socketMiddlewareEvent, middleware)
          .catch(catchBlock, socket, socketMiddlewareEvent)
          .run();
      }
    );
  }) as CustomUse;
};

const tryBlock = async (
  socket: Socket,
  next: SocketNext,
  socketMiddlewareEvent: SocketMiddlewareEvent,
  middleware: SocketMiddleware
) => {
  await middleware(socket, next, socketMiddlewareEvent);
};

const catchBlock = (
  error: NativeError | NativeError[] | undefined,
  socket: Socket,
  socketMiddlewareEvent: SocketMiddlewareEvent
) => {
  logger.debug(`error in middleware:${socketMiddlewareEvent[0]}`, error);

  const response: SocketResponse = {
    data: {},
    errors: helpers.resolveResponseError(error),
    ok: false,
  };

  const successResponseCallback = socketMiddlewareEvent[2];

  if (typeof successResponseCallback === "function")
    successResponseCallback(response);

  socket.emit("error", response);
};

export { registerCustomUse };
