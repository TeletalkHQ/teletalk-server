const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const addBlock = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const blockingCellphone = userUtilities.extractCellphone(data);

  await services.addBlock().run({ blockingCellphone, currentUserId });

  return { blockedCellphone: blockingCellphone };
};

module.exports = { addBlock };
