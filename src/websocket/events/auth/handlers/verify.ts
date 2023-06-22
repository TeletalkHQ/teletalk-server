import { clientStore } from "~/classes/ClientStore";
import { userUtilities } from "~/classes/UserUtilities";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

const verify: SocketOnHandler = async (socket) => {
  const client = (await clientStore.find(socket.clientId))!;

  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) {
    await addNewClient(foundUser.userId, socket.clientId);
    clientStore.update(socket.clientId, {
      ...client,
      userId: foundUser.userId,
    });

    return {
      data: {
        newUser: false,
      },
    };
  }

  return {
    data: {
      newUser: true,
    },
  };
};

const addNewClient = async (userId: string, clientId: string) => {
  await services.addNewClient({
    clientId,
    userId,
  });
};

export { verify };
