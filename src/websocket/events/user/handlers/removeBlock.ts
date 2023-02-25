const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const removeBlock = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const targetUserData = userUtilities.extractCellphone(data);

  await services.removeBlock().run({ currentUserId, targetUserData });

  return {
    removedBlock: targetUserData,
  };
};

module.exports = { removeBlock };
