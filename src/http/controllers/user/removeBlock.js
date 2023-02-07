const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToRemoveBlock = async (req) => {
  const { currentUserId, body } = req;
  const targetUserData = userUtilities.extractCellphone(body);

  await services.removeBlock().run({ currentUserId, targetUserData });
  return {
    removedBlock: targetUserData,
  };
};

const removeBlock = controllerBuilder.create().body(tryToRemoveBlock).build();

module.exports = { removeBlock };
