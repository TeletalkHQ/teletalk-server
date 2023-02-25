const { services } = require("@/services");

const getContacts = async (socket) => {
  const { currentUserId } = socket;

  const contacts = await services.getUserContacts().run({ currentUserId });

  return {
    contacts,
  };
};

module.exports = { getContacts };
