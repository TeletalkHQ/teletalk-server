import { trier } from "simple-trier";
import { Socket } from "socket.io";
import {
  errorThrower,
  isDataHasEqualityWithTargetCellphone,
} from "utility-store";

import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import {
  Cellphone,
  HydratedUserMongo,
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

const tryBlock = async (socket: Socket, data: Cellphone) => {
  const { tokenId } = socket.authData.data.payload;

  const currentUser = (await services.findOneUserById(
    tokenId
  )) as HydratedUserMongo;

  const currentUserCellphone = userUtilities.extractCellphone(currentUser);
  errorThrower(
    isDataHasEqualityWithTargetCellphone(currentUserCellphone, data),
    () => ({ ...errors.SELF_STUFF, targetCellphone: data })
  );

  return { ok: true };
};

const executeIfNoError = (_: SocketMiddlewareReturnValue, next: SocketNext) => {
  next();
};

export { selfStuffCheck };
