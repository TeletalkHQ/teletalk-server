const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToAddContact = async (req) => {
  const { body, currentUserId } = req;
  const contact = userPropsUtilities.extractContact(body);

  const { newContact } = await services
    .addContact()
    .run({ currentUserId, contact });
  return {
    addedContact: {
      ...newContact,
      userId: newContact.userId,
    },
  };
};

const addContact = controllerBuilder.create().body(tryToAddContact).build();

module.exports = { addContact };
