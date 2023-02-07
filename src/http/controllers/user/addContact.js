const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToAddContact = async (req) => {
  const { body, currentUserId } = req;
  const newContactData = userUtilities.extractContact(body);

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

const addContact = controllerBuilder.create().body(tryToAddContact).build();

module.exports = { addContact };
