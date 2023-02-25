const { authManager } = require("@/classes/AuthManager");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const updateOnlineStatus = async (socket) => {
  const token = authManager.getTokenFromSocket(socket);

  const currentUserId = userUtilities.getUserIdFromToken(token);

  await services.updateOnlineStatus().run({
    currentUserId,
    online: socket.connected,
  });
};

module.exports = {
  updateOnlineStatus,
};
