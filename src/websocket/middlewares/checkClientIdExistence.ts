import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import { models } from "@/models";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { utilities } from "@/utilities";

import { errors } from "@/variables/errors";

const checkClientIdExistence: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(checkClientIdExistence.name)
    .tryAsync(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket) => {
  const cookie = socket.handshake.headers.cookie;
  if (!cookie) throw errors.CLIENT_ID_REQUIRED;

  const clientId = utilities.extractClientIdFromCookie(cookie);

  //CLEANME: Add validator
  errorThrower(
    clientId.length < models.native.clientId.minlength.value,
    errors.CLIENT_ID_MIN_LENGTH_REACH
  );

  errorThrower(
    clientId.length > models.native.clientId.maxlength.value,
    errors.CLIENT_ID_MAX_LENGTH_REACH
  );

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { checkClientIdExistence };
