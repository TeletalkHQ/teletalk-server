import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { clientManager } from "@/classes/ClientIdManager";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { errors } from "@/variables";

export const verifyClient: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(verifyClient.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .catch(catchBlock)
    .run();
};

const tryBlock = async (socket: Socket) => {
  socket.authClient = await clientManager.verifyClient(socket.clientStr);

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

const catchBlock = () => {
  return errors.client_invalid;
};
