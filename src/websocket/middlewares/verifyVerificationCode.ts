import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { errorThrower } from "utility-store";

import { temporaryClients } from "@/classes/TemporaryClients";

import { SocketMiddleware, StringMap } from "@/types";

import { errors } from "@/variables/errors";

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
  const { sessionId } = socket.authData.data.payload;
  const { verificationCode: sentVerificationCode } = data;

  const temporaryClient = await findTemporaryClient(sessionId);
  const { verificationCode: actualVerificationCode } = temporaryClient;

  errorThrower(sentVerificationCode !== actualVerificationCode, {
    ...errors.VERIFICATION_CODE_INVALID,
    sentVerificationCode,
  });

  await temporaryClients.update(sessionId, {
    ...temporaryClient,
    isVerified: true,
  });
};

const findTemporaryClient = async (sessionId: string) => {
  const temporaryClient = await temporaryClients.find(sessionId);
  if (!temporaryClient) throw errors.TEMPORARY_CLIENT_NOT_FOUND;
  return temporaryClient;
};

export { verifyVerificationCode };
