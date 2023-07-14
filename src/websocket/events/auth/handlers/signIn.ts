import { extractor, randomMaker } from "utility-store";
import { ExtendedCellphone } from "utility-store/lib/types";

import { clientStore } from "~/classes/ClientStore";
import { smsClient } from "~/classes/SmsClient";
import { models } from "~/models";
import { SignInIO, SocketOnHandler, StoredClient } from "~/types";
import { utils } from "~/utils";

export const signIn: SocketOnHandler<SignInIO> = async (socket, data) => {
  //TODO: Use another utility to generate verification code
  const verificationCode = utils.passwordGenerator();

  const cellphone = extractor.cellphone(data as ExtendedCellphone);

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
