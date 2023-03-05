import { authManager } from "@/classes/AuthManager";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

const updateOnlineStatus = async (socket) => {
  const token = authManager.getTokenFromSocket(socket);

  const currentUserId = userUtilities.getTokenId(token);

  await services.updateOnlineStatus().run({
    currentUserId,
    online: socket.connected,
  });
};

export { updateOnlineStatus };
