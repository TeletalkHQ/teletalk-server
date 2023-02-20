const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const editContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const { userId, ...editValues } = userUtilities.extractContact(data);

  await services.updateContact().run({ currentUserId, editValues });

  return {
    editedContact: editValues,
  };
};

module.exports = {
  editContact,
};
