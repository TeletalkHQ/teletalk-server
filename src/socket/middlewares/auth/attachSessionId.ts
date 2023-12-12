import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { errorStore } from "~/classes/ErrorStore";
import { sessionManager } from "~/classes/SessionManager";
import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";

export const attachSessionId: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier(attachSessionId.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .catch(catchBlock, socket)
    .run();
};

const tryBlock = async (socket: Socket) => {
  const { session } = socket.handshake.auth;

  const verifiedSession = await sessionManager.verify(session);
  socket.sessionId = sessionManager.getSessionId(verifiedSession);
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

const catchBlock = (_err: unknown, socket: Socket) => {
  if (!socket.handshake.auth.session)
    return errorStore.find("SESSION_NOT_FOUND");

  return errorStore.find("SESSION_ID_INVALID");
};
