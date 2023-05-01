import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { utilities } from "@/utilities";

const attachClientId: SocketMiddleware = async (socket, next, [_name]) => {
  return await trier<SocketMiddlewareReturnValue>(attachClientId.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const cookie = socket.handshake.headers.cookie!;

  socket.clientId = utilities.extractClientIdFromCookie(cookie);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { attachClientId };
