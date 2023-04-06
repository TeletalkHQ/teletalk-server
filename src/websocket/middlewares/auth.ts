import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { authManager } from "@/classes/AuthManager";

import { SocketMiddleware, SocketNext, VerifiedToken } from "@/types";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

import { routes } from "@/websocket/events";

const auth: SocketMiddleware = async (socket, next, [name]) => {
  await trier<VerifiedToken>(auth.name)
    .tryAsync(tryBlock, socket, name)
    .executeIfNoError(executeIfNoError, socket, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket, eventName: string) => {
  if (!socket.handshake.headers.cookie) throw errors.TOKEN_REQUIRED;

  const session = authManager.getSessionFromSocket(socket);

  if (!session) throw errors.TOKEN_REQUIRED;

  const secret = [routes.verify.name, routes.createNewUser.name].includes(
    eventName
  )
    ? authManager.getSignInSecret()
    : authManager.getMainSecret();

  return await validators.token(session, secret);
};

const executeIfNoError = (
  verifiedToken: VerifiedToken,
  socket: Socket,
  next: SocketNext
) => {
  socket.authData = verifiedToken;
  next();
};

export { auth };
