const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToEditContact = async (req) => {
  const {
    body,
    body: { firstName, lastName },
    currentUserId,
  } = req;
  const targetCellphone = userPropsUtilities.extractCellphone(body);
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
