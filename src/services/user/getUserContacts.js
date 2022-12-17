const { commonServices } = require("@/services/common");

const getUserContacts = async ({ currentUserId }) => {
  const currentUser = await commonServices.findUserById(currentUserId);

  return currentUser.contacts;
};

module.exports = { getUserContacts };
