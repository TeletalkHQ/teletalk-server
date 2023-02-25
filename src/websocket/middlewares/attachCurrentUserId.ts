import { userUtilities } from "@/classes/UserUtilities";

const attachCurrentUserId = (socket, next) => {
  socket.currentUserId = userUtilities.getUserIdFromVerifiedToken(
    socket.authData
  );

  next();
};

export { attachCurrentUserId };
