import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { authManager } from "@/classes/AuthManager";

import { SocketMiddleware, SocketNext, VerifiedToken } from "@/types";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

const auth: SocketMiddleware = async (socket, next) => {
  await trier<VerifiedToken>(auth.name)
    .tryAsync(tryBlock, socket)
    .executeIfNoError(executeIfNoError, socket, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket) => {
  if (!socket.handshake.headers.cookie) throw errors.TOKEN_REQUIRED;

  const token = authManager.getTokenFromSocket(socket);

  if (!token) throw errors.TOKEN_REQUIRED;

  return await validators.token(token, authManager.getMainSecret());
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
