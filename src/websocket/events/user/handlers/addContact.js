const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const addContact = async (socket, _io, data) => {
  const { currentUserId } = socket;
  const newContactData = userUtilities.extractContact(data);

  const { newContact } = await services
    .addContact()
    .run({ currentUserId, newContactData });

  return {
    addedContact: {
      ...newContact,
      userId: newContact.userId,
    },
  };
};

module.exports = { addContact };
