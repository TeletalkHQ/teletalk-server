import { errorThrower } from "utility-store";
import { trier } from "simple-trier";

import { authManager } from "@/classes/AuthManager";

import { services } from "@/services";

import { errors } from "@/variables/errors";
import { SocketMiddleware, SocketNext } from "@/types";
import { Socket } from "socket.io";

const checkCurrentUserStatus: SocketMiddleware = async (socket, next) => {
  await trier<void>(checkCurrentUserStatus.name)
    .tryAsync(tryBlock, socket)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket) => {
  const error = errors.CURRENT_USER_NOT_EXIST;

  const {
    data: {
      payload: { tokenId },
    },
  } = socket.authData;

  const currentUser = await services.findOneUser({ userId: tokenId });
  if (!currentUser)
    throw {
      ...error,
      wrongTokenId: tokenId,
    };

  errorThrower(currentUser.userId !== tokenId, {
    ...error,
    wrongTokenId: tokenId,
  });

  const token = authManager.getTokenFromSocket(socket);
  const isSessionExist = currentUser.sessions.some((t) => t.token === token);
  errorThrower(!isSessionExist, {
    ...error,
    isSessionExist,
  });
};

const executeIfNoError = (_: void, next: SocketNext) => {
  next();
};

export { checkCurrentUserStatus };
