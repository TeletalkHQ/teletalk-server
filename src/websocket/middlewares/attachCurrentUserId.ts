const { userUtilities } = require("@/classes/UserUtilities");

const attachCurrentUserId = (socket, next) => {
  socket.currentUserId = userUtilities.getUserIdFromVerifiedToken(
    socket.authData
  );

  next();
};

module.exports = { attachCurrentUserId };
