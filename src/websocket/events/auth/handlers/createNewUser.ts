import { errorThrower, randomMaker } from "utility-store";

import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { services } from "@/services";

import { Cellphone, SocketOnHandler, Client, UserMongo } from "@/types";

import { errors } from "@/variables/errors";

const createNewUser: SocketOnHandler = async (
  socket,
  { firstName, lastName }
) => {
  const client = await findClient(socket.clientId);
  checkClientVerification(client);

  const cellphone = userUtilities.extractCellphone(client);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();
  const session = sign(userId);

  await saveNewUser({
    ...userUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    createdAt: Date.now(),
    userId,
    sessions: [{ session }],
    status: { isActive: false },
  });

  await clientStore.update(socket.clientId, { ...client, session });

  return { data: {} };
};

const findClient = async (sessionId: string) => {
  const client = await clientStore.find(sessionId);
  if (!client) throw errors.CLIENT_NOT_FOUND;
  return client;
};

const checkClientVerification = (client: Client) => {
  errorThrower(!client.isVerified, {
    ...errors.CLIENT_NOT_VERIFIED,
    createNewUser: "failed",
  });
};

const checkExistenceOfUser = async (cellphone: Cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) throw errors.USER_EXIST;
};

const getRandomId = () => randomMaker.id(models.native.userId.maxlength.value);

const sign = (sessionId: string) => {
  return authManager.signSession({
    sessionId,
    date: Date.now(),
  });
};

const saveNewUser = async (data: UserMongo) => {
  await services.createNewUser(data);
};

export { createNewUser };
