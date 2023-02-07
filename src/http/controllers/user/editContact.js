const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToEditContact = async (req) => {
  const { body, currentUserId } = req;
  const { userId, ...editValues } = userUtilities.extractContact(body);

  await services.updateContact().run({ currentUserId, editValues });

  return {
    editedContact: editValues,
  };
};

const editContact = controllerBuilder.create().body(tryToEditContact).build();

module.exports = {
  editContact,
};
