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

import { errors } from "@/variables";

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
  if (!cookie) throw errors.clientId_required_error;

  const clientId = utilities.extractClientIdFromCookie(cookie);

  //CLEANME: Add validator
  errorThrower(
    clientId.length < models.native.clientId.minLength,
    errors.clientId_minLength_error
  );

  errorThrower(
    clientId.length > models.native.clientId.maxLength,
    errors.clientId_maxLength_error
  );

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { checkClientIdExistence };
