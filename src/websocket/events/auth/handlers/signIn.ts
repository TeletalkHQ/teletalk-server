import { randomMaker } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { authManager } from "@/classes/AuthManager";
import { smsClient } from "@/classes/SmsClient";
import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { SocketOnHandler, Client } from "@/types";

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

  const sessionId = createSessionId();
  const session = sign({
    sessionId,
    date: Date.now(),
  });
  await addClient(socket.clientId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
    session,
  });

  return { data: {} };
};

const validateVerificationCode = async (verificationCode: string) =>
  await validators.verificationCode(verificationCode);

const sendVerificationCode = async (
  fullNumber: string,
  host: string,
  verificationCode: string
) => await smsClient.sendVerificationCode(fullNumber, host, verificationCode);

const createSessionId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

//CLEANME: Use session interface
const sign = (data: { sessionId: string; date: number }) =>
  authManager.signSession(data, authManager.getSignInSecret());

const addClient = async (sessionId: string, data: Client) =>
  await clientStore.add(sessionId, data);

export { signIn };
