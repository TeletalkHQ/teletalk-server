import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { validators } from "@/validators";

export const validateClientId: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(validateClientId.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  await validators.clientId(socket.clientId);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
