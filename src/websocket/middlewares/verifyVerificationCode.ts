import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import { clientStore } from "~/classes/ClientStore";
import { SocketMiddleware, SocketNext, VerifyIO } from "~/types";
import { errors } from "~/variables";

export const verifyVerificationCode: SocketMiddleware<VerifyIO> = async (
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

const tryBlock = async (socket: Socket, data: VerifyIO["input"]) => {
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
