const { services } = require("@/services");

const updateOnlineStatus = async (socket) => {
  await services.updateOnlineStatus().run({
    currentUserId: socket.currentUserId,
    online: socket.connected,
  });
};

module.exports = {
  updateOnlineStatus,
};
