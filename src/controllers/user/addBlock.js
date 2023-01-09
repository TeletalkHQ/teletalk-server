const { controllerBuilder } = require("@/classes/ControllerBuilder");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const tryToAddBlockCellphone = async (req) => {
  const { body, currentUserId } = req;
  const blockingCellphone = userUtilities.extractCellphone(body);

  await services.addBlock().run({ blockingCellphone, currentUserId });

  return { blockedCellphone: blockingCellphone };
};

const addBlock = controllerBuilder
  .create()
  .body(tryToAddBlockCellphone)
  .build();

module.exports = { addBlock };
