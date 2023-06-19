import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import { clientStore } from "~/classes/ClientStore";
import { SocketMiddleware, SocketNext, StringMap } from "~/types";
import { errors } from "~/variables";

const verifyVerificationCode: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  await trier<void>(verifyVerificationCode.name)
    .async()
    .try(tryBlock, socket, data)
    .executeIfNoError(executeIfNoError, next)
    .throw()
    .run();
};

const tryBlock = async (socket: Socket, data: StringMap) => {
  const { verificationCode: sentVerificationCode } = data;

  const client = await findClient(socket.clientId);
  const { verificationCode: actualVerificationCode } = client;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...errors.verificationCode_invalid,
    sentVerificationCode,
  });

  await clientStore.update(socket.clientId, {
    ...client,
    isVerified: true,
  });
};

const findClient = async (clientId: string) => {
  const client = await clientStore.find(clientId);
  if (!client) throw errors.clientNotFound;
  return client;
};

const executeIfNoError = (_: void, next: SocketNext) => {
  () => next();
};

export { verifyVerificationCode };
