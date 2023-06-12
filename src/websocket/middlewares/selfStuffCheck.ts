import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";

import { errors } from "~/variables";

const selfStuffCheck: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(selfStuffCheck.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket, data: { userId: string }) => {
  errorThrower(socket.userId === data.userId, {
    ...errors.selfStuff,
    targetUserId: data.userId,
  });

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { selfStuffCheck };
