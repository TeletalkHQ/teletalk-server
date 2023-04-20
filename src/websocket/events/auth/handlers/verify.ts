import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler, Client } from "@/types";

const verify: SocketOnHandler = async (socket) => {
  const client = (await clientStore.find(socket.clientId)) as Client;

  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) {
    const session = sign(foundUser.userId);
    await addNewSession(foundUser.userId, session);
    clientStore.update(socket.clientId, { ...client, session });

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

const sign = (userId: string) => {
  return authManager.signSession(
    {
      sessionId: userId,
      date: Date.now(),
    },
    authManager.getMainSecret()
  );
};

const addNewSession = async (userId: string, session: string) => {
  await services.addNewSession({
    session,
    userId,
  });
};

export { verify };
