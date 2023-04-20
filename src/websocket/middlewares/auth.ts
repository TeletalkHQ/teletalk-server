import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";

import { SocketMiddleware, SocketNext, Verified } from "@/types";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

const auth: SocketMiddleware = async (socket, next, [name]) => {
  await trier<Verified>(auth.name)
    .tryAsync(tryBlock, socket, name)
    .executeIfNoError(executeIfNoError, socket, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket, eventName: string) => {
  const client = await clientStore.find(socket.clientId);

  if (!client) throw errors.CLIENT_NOT_FOUND;

  const secret = authManager.getSecret(eventName);
  const { session } = client;
  return await validators.session(session, secret);
};

const executeIfNoError = (
  verified: Verified,
  socket: Socket,
  next: SocketNext
) => {
  socket.authData = verified;
  next();
};

export { auth };
