const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const removeContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const targetUserData = userUtilities.extractCellphone(data);

  await services.removeContact().run({
    currentUserId,
    targetUserData,
  });

  return {
    removedContact: targetUserData,
  };
};

module.exports = { removeContact };
