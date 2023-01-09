const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToEditContact = async (req) => {
  const {
    body,
    body: { firstName, lastName },
    currentUserId,
  } = req;
  const targetCellphone = userUtilities.extractCellphone(body);
  const editedValues = { firstName, lastName };

  await services
    .updateContact()
    .run({ currentUserId, editedValues, targetCellphone });

  return {
    editedContact: { ...targetCellphone, ...editedValues },
  };
};

const editContact = controllerBuilder.create().body(tryToEditContact).build();

module.exports = { editContact };
