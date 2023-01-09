const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToRemoveContact = async (req) => {
  const { currentUserId, body } = req;
  const targetUserData = userUtilities.extractCellphone(body);

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
