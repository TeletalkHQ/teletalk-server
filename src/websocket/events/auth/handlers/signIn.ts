import { randomMaker } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { authManager } from "@/classes/AuthManager";
import { smsClient } from "@/classes/SmsClient";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { SocketOnHandler, TemporaryClient } from "@/types";

import { utilities } from "@/utilities";

import { validators } from "@/validators";

const signIn: SocketOnHandler = async (socket, data) => {
  const verificationCode = utilities.passwordGenerator();
  await validateVerificationCode(verificationCode);

  const cellphone = userUtilities.extractCellphone(data as ExtendedCellphone);

  //FIXME: Get host from socket
  // const host = getHostFromRequest(req);
  const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;
  await sendVerificationCode(fullNumber, "host", verificationCode);

  const clientId = createClientId();
  const token = signToken({
    tokenId: clientId,
    date: Date.now(),
  });
  authManager.setSessionOnSocket(socket, token);
  await addClient(clientId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
  });

  //DANGER: according to security reasons we should NOT send clientId
  return {
    data: {
      token,
    },
  };
};

const validateVerificationCode = async (verificationCode: string) =>
  await validators.verificationCode(verificationCode);

const sendVerificationCode = async (
  fullNumber: string,
  host: string,
  verificationCode: string
) => await smsClient.sendVerificationCode(fullNumber, host, verificationCode);

const createClientId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

//CLEANME: Use token interface
const signToken = (data: { tokenId: string; date: number }) =>
  authManager.signToken(data, authManager.getSignInSecret());

const addClient = async (tokenId: string, data: TemporaryClient) =>
  await temporaryClients.add(tokenId, data);

export { signIn };
