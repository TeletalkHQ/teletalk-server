const { services } = require("@/services");

const getPrivateChats = async (socket) => {
  const privateChats = await services
    .getAllPrivateChats()
    .exclude()
    .run({ currentUserId: socket.currentUserId });

  return { privateChats };
};

module.exports = { getPrivateChats };
