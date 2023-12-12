import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  CustomUse,
  NativeError,
  SocketDefaultMiddlewareEvent,
  SocketMiddleware,
  SocketMiddlewareEvent,
  SocketNext,
  SocketResponse,
} from "~/types";
import { utils } from "~/utils";

export const registerCustomUse = (socket: Socket) => {
  return ((middleware) => {
    socket.use(
      async (socketMiddlewareEvent: SocketDefaultMiddlewareEvent, next) => {
        await trier(`customUse:${socketMiddlewareEvent[0]}`)
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
  logger.error(`customUse:catchBlock:${socketMiddlewareEvent[0]}`, error);

  const response: SocketResponse = utils.createFailureResponse(
    socketMiddlewareEvent[0],
    error
  );

  const successResponseCallback = socketMiddlewareEvent[2];

  if (typeof successResponseCallback === "function")
    successResponseCallback(response);

  socket.emit("error", response);
};
