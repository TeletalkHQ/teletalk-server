import { clientStore } from "~/classes/ClientStore";

import { services } from "~/services";

import { SocketOnHandler } from "~/types";

const logout: SocketOnHandler = async (socket) => {
  const { userId } = socket;

  await services.logout({
    clientId: socket.clientId,
    userId,
  });

  await clientStore.remove(socket.clientId);

  return { data: {} };
};

export { logout };
