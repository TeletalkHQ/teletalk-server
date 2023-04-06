// import { authManager } from "@/classes/AuthManager";
// import { userUtilities } from "@/classes/UserUtilities";

// import { services } from "@/services";

import { SocketOnHandler } from "@/types";

const updateOnlineStatus: SocketOnHandler = async (_socket) => {
  // const token = authManager.getSessionFromSocket(socket) as string;
  // const currentUserId = userUtilities.getTokenId(token);
  //FIXME: Update user online status
};

export { updateOnlineStatus };
