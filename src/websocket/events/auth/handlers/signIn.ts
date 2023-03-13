import { randomMaker } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { smsClient } from "@/classes/SmsClient";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { Cellphone, SocketOnHandler, TemporaryClient } from "@/types";

import { utilities } from "@/utilities";

import { validators } from "@/validators";

const signIn: SocketOnHandler = async (socket, data) => {
  const verificationCode = utilities.passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userUtilities.extractCellphone(data as Cellphone);

  //FIXME: Get host from socket
  // const host = getHostFromRequest(req);
  const fullNumber = userUtilities.makeFullNumber(
    cellphone.countryCode,
    cellphone.phoneNumber
  );
  await sendVerificationCode(fullNumber, "host", verificationCode);

  const tokenId = createClientId();
  const token = signToken({
    tokenId,
    date: Date.now(),
  });
  authManager.setSessionOnSocket(socket, token);
  await addClient(tokenId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
  });
};

const validateVerificationCode = async (verificationCode: string) => {
  await validators.verificationCode(verificationCode);
};

const sendVerificationCode = async (
  fullNumber: string,
  host: string,
  verificationCode: string
) => {
  await smsClient.sendVerificationCode(fullNumber, host, verificationCode);
};

const createClientId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (data: { tokenId: string; date: number }) => {
  return authManager.signToken(data, authManager.getSignInSecret());
};

const addClient = async (tokenId: string, data: TemporaryClient) =>
  await temporaryClients.add(tokenId, data);

export { signIn };
