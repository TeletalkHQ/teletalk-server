const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToRemoveBlock = async (req) => {
  const { currentUserId, body } = req;
  const targetUserData = userPropsUtilities.extractCellphone(body);

  await services.removeBlock().run({ currentUserId, targetUserData });
  return {
    removedBlockedCellphone: targetUserData,
  };
};

const removeBlock = controllerBuilder.create().body(tryToRemoveBlock).build();

module.exports = { removeBlock };
