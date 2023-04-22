import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";

import { SocketMiddleware, SocketNext, VerifiedSession } from "@/types";

import { validators } from "@/validators";

import { ERRORS } from "@/variables";

const auth: SocketMiddleware = async (socket, next, [name]) => {
  await trier<VerifiedSession>(auth.name)
    .tryAsync(tryBlock, socket, name)
    .executeIfNoError(executeIfNoError, socket, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket, eventName: string) => {
  const client = await clientStore.find(socket.clientId);

  if (!client) throw ERRORS.CLIENT_NOT_FOUND;

  const { session } = client;
  await validators.session(session);
  const secret = authManager.getSecret(eventName);
  return authManager.verify(session, secret);
};

const executeIfNoError = (
  verified: VerifiedSession,
  socket: Socket,
  next: SocketNext
) => {
  socket.authData = verified;
  next();
};

export { auth };
