import { errorThrower, randomMaker } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { services } from "@/services";

import {
  Cellphone,
  SocketOnHandler,
  TemporaryClient,
  UserMongo,
} from "@/types";

import { validators } from "@/validators";

import { errors } from "@/variables/errors";

const createNewUser: SocketOnHandler = async (
  socket,
  { firstName, lastName }
) => {
  await validators.firstName(firstName);
  await validators.lastName(lastName);

  const { sessionId } = socket.authData.data.payload;
  const client = await findClient(sessionId);
  checkClientVerification(client);

  const cellphone = userUtilities.extractCellphone(client);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();
  const token = signToken(userId);
  authManager.setSessionOnSocket(socket, token);

  await saveNewUser({
    ...userUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    createdAt: Date.now(),
    userId,
    sessions: [{ token }],
    status: { isActive: false },
  });

  await removeTemporaryClient(sessionId);

  return {
    data: {
      token,
    },
  };
};

const findClient = async (sessionId: string) => {
  const client = await temporaryClients.find(sessionId);
  if (!client) throw errors.TEMPORARY_CLIENT_NOT_FOUND;
  return client;
};

const checkClientVerification = (client: TemporaryClient) => {
  errorThrower(!client.isVerified, {
    ...errors.TEMPORARY_CLIENT_NOT_VERIFIED,
    createNewUser: "failed",
  });
};

const checkExistenceOfUser = async (cellphone: Cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) throw errors.USER_EXIST;
};

const getRandomId = () =>
  randomMaker.id(models.native.user.userId.maxlength.value);

const signToken = (sessionId: string) => {
  return authManager.signToken({
    sessionId,
    date: Date.now(),
  });
};

const saveNewUser = async (data: UserMongo) => {
  await services.createNewUser(data);
};

const removeTemporaryClient = async (clientId: string) => {
  await temporaryClients.remove(clientId);
};

export { createNewUser };
