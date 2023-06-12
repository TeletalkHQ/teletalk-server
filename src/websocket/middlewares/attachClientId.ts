import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";

export const attachClientId: SocketMiddleware = async (
  socket,
  next,
  [_name]
) => {
  return await trier<SocketMiddlewareReturnValue>(attachClientId.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  socket.clientId = socket.authClient.payload.clientId;

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
