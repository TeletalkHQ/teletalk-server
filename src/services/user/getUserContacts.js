const { commonServices } = require("@/services/common");

const getUserContacts = async ({ currentUserId }) => {
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });

  return currentUser.contacts;
};

module.exports = { getUserContacts };
