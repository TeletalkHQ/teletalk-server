import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { helpers } from "@/helpers";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { errors } from "@/variables";

export const verifyClientId: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(verifyClientId.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .catch(catchBlock)
    .run();
};

const tryBlock = async (socket: Socket) => {
  helpers.verifyClientId(socket.clientId);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

const catchBlock = () => {
  return errors.clientId_invalid;
};
