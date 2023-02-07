const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetUserData = async (req) => {
  const { currentUserId } = req;

  const { sessions, ...userData } = await services.getCurrentUserData({
    userId: currentUserId,
  });

  return {
    user: userData,
  };
};

const getCurrentUserData = controllerBuilder
  .create()
  .body(tryToGetUserData)
  .build();

module.exports = { getCurrentUserData };
