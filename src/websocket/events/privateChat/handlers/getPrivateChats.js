const { services } = require("@/services");

const getPrivateChats = async (socket, callback) => {
  const { currentUserId } = socket;

  const privateChats = await services
    .getAllPrivateChats()
    .exclude()
    .run({ currentUserId });

  callback(privateChats);
};

module.exports = { getPrivateChats };
