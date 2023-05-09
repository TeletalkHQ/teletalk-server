import { trier } from "simple-trier";
import { Socket } from "socket.io";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { utilities } from "@/utilities";

import { validators } from "@/validators";

import { errors } from "@/variables";

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
  const { cookie } = socket.handshake.headers;
  if (!cookie) throw errors.clientId_required_error;
  const clientId = utilities.extractClientIdFromCookie(cookie);

  await validators.clientId(clientId);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
