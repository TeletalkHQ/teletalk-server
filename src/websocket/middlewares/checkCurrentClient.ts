import { errorThrower } from "utility-store";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { services } from "@/services";

import { SocketMiddleware, SocketNext } from "@/types";

import { errors } from "@/variables";

export const checkCurrentClient: SocketMiddleware = async (socket, next) => {
  await trier<void>(checkCurrentClient.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const currentUser = (await services.findOneUser({ userId: socket.userId }))!;

  const isClientExist = currentUser.clients.some(
    (t) => t.clientId === socket.clientId
  );

  errorThrower(!isClientExist, errors.currentClientNotExist);
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};
