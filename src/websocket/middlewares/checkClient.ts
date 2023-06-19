import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { clientStore } from "~/classes/ClientStore";
import { SocketMiddleware, SocketNext } from "~/types";
import { errors } from "~/variables";

export const checkClient: SocketMiddleware = async (socket, next) => {
  await trier(checkClient.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const client = await clientStore.find(socket.clientId);
  if (!client) throw errors.clientNotFound;
};

const executeIfNoError = (_: undefined, next: SocketNext) => {
  next();
};
