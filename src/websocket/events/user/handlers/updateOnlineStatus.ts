import { authManager } from "@/classes/AuthManager";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const updateOnlineStatus: SocketOnHandler = async (socket) => {
  const token = authManager.getTokenFromSocket(socket) as string;

  const currentUserId = userUtilities.getTokenId(token);

  await services.updateOnlineStatus({
    currentUserId,
    isOnline: socket.connected,
  });
};

export { updateOnlineStatus };
