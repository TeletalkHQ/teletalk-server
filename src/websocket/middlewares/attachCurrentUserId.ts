import { userUtilities } from "@/classes/UserUtilities";

import { SocketMiddleware } from "@/types";

const attachCurrentUserId: SocketMiddleware = (socket, next) => {
  socket.currentUserId = userUtilities.getUserIdFromVerifiedToken(
    socket.authData
  );

  next();
};

export { attachCurrentUserId };
