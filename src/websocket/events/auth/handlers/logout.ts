import { clientStore } from "@/classes/ClientStore";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const logout: SocketOnHandler = async (socket) => {
  const { currentUserId } = socket;
  const { session } = (await clientStore.find(socket.clientId))!;

  await services.logout({
    current: session,
    currentUserId,
  });

  await clientStore.remove(socket.clientId);

  return { data: {} };
};

export { logout };
