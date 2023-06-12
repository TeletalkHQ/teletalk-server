import { randomMaker } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { smsClient } from "~/classes/SmsClient";
import { clientStore } from "~/classes/ClientStore";
import { userUtilities } from "~/classes/UserUtilities";

import { models } from "~/models";

import { SocketOnHandler, StoredClient } from "~/types";

import { utilities } from "~/utilities";

const signIn: SocketOnHandler = async (socket, data) => {
  //TODO: Use another utility to generate verification code
  const verificationCode = utilities.passwordGenerator();

  const cellphone = userUtilities.extractCellphone(data as ExtendedCellphone);

  //FIXME: Get host from socket
  // const host = getHostFromRequest(req);
  const fullNumber = `+${cellphone.countryCode}${cellphone.phoneNumber}`;
  await sendVerificationCode(fullNumber, "host", verificationCode);

  await addClient(socket.clientId, {
    ...cellphone,
    isVerified: false,
    verificationCode,
    userId: createUserId(),
  });

  return { data: {} };
};

const sendVerificationCode = async (
  fullNumber: string,
  host: string,
  verificationCode: string
) => await smsClient.sendVerificationCode(fullNumber, host, verificationCode);

//TODO: Remove models from handlers
const createUserId = () => randomMaker.id(models.native.userId.maxLength);

const addClient = async (clientId: string, data: StoredClient) =>
  await clientStore.add(clientId, data);

export { signIn };
