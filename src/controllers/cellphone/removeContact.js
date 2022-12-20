const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToRemoveContact = async (req) => {
  const { currentUserId, body } = req;
  const targetUserData = userPropsUtilities.extractCellphone(body);

  await services.removeContact().run({
    currentUserId,
    targetUserData,
  });
  return {
    removedContact: targetUserData,
  };
};

const removeContact = controllerBuilder
  .create()
  .body(tryToRemoveContact)
  .build();

module.exports = { removeContact };
