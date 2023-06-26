import { errorThrower, randomMaker } from "utility-store";
import { CLientId, Cellphone, UserData } from "utility-store/lib/types";

import { clientStore } from "~/classes/ClientStore";
import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";
import { services } from "~/services";
import { CreateNewUserIO, SocketOnHandler, StoredClient } from "~/types";
import { errors } from "~/variables";

const createNewUser: SocketOnHandler<CreateNewUserIO> = async (
  socket,
  { firstName, lastName }
) => {
  const client = await findClient(socket.clientId);
  checkClientVerification(client);

  const cellphone = userUtils.extractCellphone(client);
  await checkExistenceOfUser(cellphone);

  const userId = getRandomId();

  await saveNewUser({
    ...userUtils.getDefaultUserData(),
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

const findClient = async (clientId: CLientId) => {
  const client = await clientStore.find(clientId);
  if (!client) throw errors.clientNotFound;
  return client;
};

const checkClientVerification = (client: StoredClient) => {
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

const saveNewUser = async (data: UserData) => {
  await services.createNewUser(data);
};

export { createNewUser };
