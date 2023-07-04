import { trier } from "simple-trier";
import { Socket } from "socket.io";
import {
  errorThrower,
  extractor,
  isDataHasEqualityWithTargetCellphone,
} from "utility-store";

import { services } from "~/services";
import {
  AddContactIO,
  SocketMiddleware,
  SocketMiddlewareReturnValue,
  SocketNext,
} from "~/types";
import { errors } from "~/variables";

export const selfStuffCheck: SocketMiddleware = async (
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

const tryBlock = async (socket: Socket, data: AddContactIO["input"]) => {
  if (data.userId) {
    errorThrower(socket.userId === data.userId, {
      ...errors.selfStuff,
      targetUserId: data.userId,
    });
  } else {
    const currentUser = (await services.findOneUser({
      userId: socket.userId,
    }))!;

    errorThrower(
      isDataHasEqualityWithTargetCellphone(
        data,
        extractor.cellphone(currentUser)
      ),
      {
        ...errors.selfStuff,
        targetUserCellphone: extractor.cellphone(data),
      }
    );
  }

  return {
    ok: true,
  };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};
