const { services } = require("@/services");

const getPrivateChats = async (socket) => {
  return await services
    .getAllPrivateChats()
    .exclude()
    .run({ currentUserId: socket.currentUserId });
};

module.exports = { getPrivateChats };
