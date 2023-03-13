import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketHandler, TemporaryClient } from "@/types";

const verify: SocketHandler = async (socket) => {
  const { tokenId } = socket.authData.data.payload;

  const client = (await temporaryClients.find(tokenId)) as TemporaryClient;
  const cellphone = userUtilities.extractCellphone(client);
  const foundUser = await services.findOneUser(cellphone);
  if (foundUser) {
    await removeTemporaryClient(tokenId);

    const token = signToken(foundUser.userId);
    authManager.setSessionOnSocket(socket, token);
    await addNewSession(foundUser.userId, token);

    return {
      newUser: false,
    };
  }

  return {
    newUser: true,
  };
};

const signToken = (tokenId: string) => {
  return authManager.signToken(
    {
      tokenId,
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

const removeTemporaryClient = async (tokenId: string) => {
  await temporaryClients.remove(tokenId);
};

export { verify };
