import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import { clientStore } from "@/classes/ClientStore";

import { SocketMiddleware, StringMap } from "@/types";

import { ERRORS } from "@/variables";

const verifyVerificationCode: SocketMiddleware = async (
  socket,
  next,
  [_name, data]
) => {
  await trier(verifyVerificationCode.name)
    .tryAsync(tryBlock, socket, data)
    .executeIfNoError(() => next())
    .throw()
    .runAsync();
};

const tryBlock = async (socket: Socket, data: StringMap) => {
  const { verificationCode: sentVerificationCode } = data;

  const client = await findClient(socket.clientId);
  const { verificationCode: actualVerificationCode } = client;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...ERRORS.VERIFICATION_CODE_INVALID,
    sentVerificationCode,
  });

  await clientStore.update(socket.clientId, {
    ...client,
    isVerified: true,
  });
};

const findClient = async (clientId: string) => {
  const client = await clientStore.find(clientId);
  if (!client) throw ERRORS.CLIENT_NOT_FOUND;
  return client;
};

export { verifyVerificationCode };
