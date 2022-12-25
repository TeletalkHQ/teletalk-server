const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetUserData = async (req) => {
  const { userId } = req.body;

  const user = await services.getTargetUserData().run({ userId });
  return { user };
};

const getTargetUserData = controllerBuilder
  .create()
  .body(tryToGetUserData)
  .build();

module.exports = { getTargetUserData };
