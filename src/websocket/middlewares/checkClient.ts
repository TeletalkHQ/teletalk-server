import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { clientStore } from "~/classes/ClientStore";
import { errorStore } from "~/classes/ErrorStore";
import { SocketMiddleware, SocketNext } from "~/types";

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
  if (!client) throw errorStore.find("CLIENT_NOT_FOUND");
};

const executeIfNoError = (_: undefined, next: SocketNext) => {
  next();
};
