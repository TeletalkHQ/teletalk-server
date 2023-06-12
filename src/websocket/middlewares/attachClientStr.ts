import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";

import { utilities } from "~/utilities";

import { errors } from "~/variables";

export const attachClientStr: SocketMiddleware = async (
  socket,
  next,
  [_name]
) => {
  return await trier<SocketMiddlewareReturnValue>(attachClientStr.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const { cookie } = socket.handshake.headers;
  if (!cookie) throw errors.clientCookieRequired;

  socket.clientStr = utilities.extractClientFromCookie(cookie);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
