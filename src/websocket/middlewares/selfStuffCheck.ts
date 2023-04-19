import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import {
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "@/types";

import { errors } from "@/variables/errors";

const selfStuffCheck: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  return await trier<SocketMiddlewareReturnValue>(selfStuffCheck.name)
    .tryAsync(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket, data: { userId: string }) => {
  const { sessionId } = socket.authData.data.payload;

  errorThrower(sessionId === data.userId, () => ({
    ...errors.SELF_STUFF,
    targetUserId: data.userId,
  }));

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { selfStuffCheck };
