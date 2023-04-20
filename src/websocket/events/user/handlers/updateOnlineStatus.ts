// import { authManager } from "@/classes/AuthManager";
// import { userUtilities } from "@/classes/UserUtilities";

// import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const updateOnlineStatus: SocketOnHandler = async (_socket) => {
  // const session = authManager.getSessionFromSocket(socket) as string;
  // const currentUserId = userUtilities.getId(session);
  //FIXME: Update user online status
};

export { updateOnlineStatus };
