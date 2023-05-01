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

import { ERRORS } from "@/variables";

const checkClientIdExistence: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(checkClientIdExistence.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const cookie = socket.handshake.headers.cookie;
  if (!cookie) throw ERRORS.CLIENT_ID_REQUIRED_ERROR;

  const clientId = utilities.extractClientIdFromCookie(cookie);

  //CLEANME: Add validator
  errorThrower(
    clientId.length < models.native.clientId.minLength,
    ERRORS.CLIENT_ID_MIN_LENGTH_ERROR
  );

  errorThrower(
    clientId.length > models.native.clientId.maxLength,
    ERRORS.CLIENT_ID_MAX_LENGTH_ERROR
  );

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { checkClientIdExistence };
