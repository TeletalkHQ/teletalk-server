import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler, TemporaryClient } from "@/types";

const verify: SocketOnHandler = async (socket) => {
  const { sessionId } = socket.authData.data.payload;

  const client = (await temporaryClients.find(sessionId)) as TemporaryClient;
  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) {
    await removeTemporaryClient(sessionId);

    const token = signToken(foundUser.userId);
    authManager.setSessionOnSocket(socket, token);
    await addNewSession(foundUser.userId, token);

    return {
      data: {
        newUser: false,
        token,
      },
    };
  }

  return {
    data: {
      newUser: true,
    },
  };
};

const signToken = (sessionId: string) => {
  return authManager.signToken(
    {
      sessionId,
      date: Date.now(),
    },
    authManager.getMainSecret()
  );
};

const addNewSession = async (userId: string, newToken: string) => {
  await services.addNewSession({
    newToken,
    userId,
  });
};

const removeTemporaryClient = async (sessionId: string) => {
  await temporaryClients.remove(sessionId);
};

export { verify };
