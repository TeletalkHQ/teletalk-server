const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const tryToAddBlockCellphone = async (req) => {
  const { body, currentUserId } = req;
  const blockingCellphone = userPropsUtilities.extractCellphone(body);

  await services.addBlock().run({ blockingCellphone, currentUserId });

  return { blockedCellphone: blockingCellphone };
};

const addBlock = controllerBuilder
  .create()
  .body(tryToAddBlockCellphone)
  .build();

module.exports = { addBlock };
