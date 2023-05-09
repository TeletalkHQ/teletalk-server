import { errorThrower } from "utility-store";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { services } from "@/services";

import { SocketMiddleware, SocketNext } from "@/types";

import { errors } from "@/variables";

const checkCurrentUser: SocketMiddleware = async (socket, next) => {
  await trier<void>(checkCurrentUser.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const currentUser = await services.findOneUser({ userId: socket.userId });
  errorThrower(!currentUser, errors.currentUserNotExist);
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};

export { checkCurrentUser };
