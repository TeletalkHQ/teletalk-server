import { errorThrower, randomMaker } from "utility-store";

import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { models } from "@/models";

import { services } from "@/services";

import { Cellphone, SocketOnHandler, Client, UserMongo } from "@/types";

import { errors } from "@/variables";

const createNewUser: SocketOnHandler = async (
  socket,
  { firstName, lastName }
) => {
  const client = await findClient(socket.clientId);
  checkClientVerification(client);

  const cellphone = userUtilities.extractCellphone(client);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();

  await saveNewUser({
    ...userUtilities.defaultUserData(),
    ...cellphone,
    firstName,
    lastName,
    createdAt: Date.now(),
    userId,
    clients: [{ clientId: socket.clientId }],
    status: {
      isActive: true,
    },
  });

  await clientStore.update(socket.clientId, { ...client, userId });

  return { data: {} };
};

const findClient = async (userId: string) => {
  const client = await clientStore.find(userId);
  if (!client) throw errors.clientNotFound;
  return client;
};

const checkClientVerification = (client: Client) => {
  errorThrower(!client.isVerified, {
    ...errors.clientNotVerified,
    createNewUser: "failed",
  });
};

const checkExistenceOfUser = async (cellphone: Cellphone) => {
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) throw errors.userExist;
};

const getRandomId = () => randomMaker.id(models.native.userId.maxLength);

const saveNewUser = async (data: UserMongo) => {
  await services.createNewUser(data);
};

export { createNewUser };
