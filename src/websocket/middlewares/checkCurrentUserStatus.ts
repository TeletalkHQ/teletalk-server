import { errorThrower } from "utility-store";
import { trier } from "simple-trier";
import { Socket } from "socket.io";

import { clientStore } from "@/classes/ClientStore";

import { services } from "@/services";

import { SocketMiddleware, SocketNext } from "@/types";

import { ERRORS } from "@/variables";

const checkCurrentUserStatus: SocketMiddleware = async (socket, next) => {
  await trier<void>(checkCurrentUserStatus.name)
    .async()
    .try(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket) => {
  const {
    data: {
      payload: { sessionId },
    },
  } = socket.authData;

  const currentUser = await services.findOneUser({ userId: sessionId });
  if (!currentUser) throw ERRORS.CURRENT_USER_NOT_EXIST;

  const { session } = (await clientStore.find(socket.clientId))!;
  const isSessionExist = currentUser.sessions.some(
    (t) => t.session === session
  );
  errorThrower(!isSessionExist, ERRORS.CURRENT_SESSION_NOT_EXIST);
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};

export { checkCurrentUserStatus };
