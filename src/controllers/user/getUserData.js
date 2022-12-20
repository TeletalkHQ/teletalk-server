const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetUserData = async (req) => {
  const { authData } = req;
  const { sessions, ...userData } = await services
    .getUserData()
    .exclude()
    .run({ userId: authData.payload.userId });

  return {
    user: userData,
  };
};

const getUserData = controllerBuilder.create().body(tryToGetUserData).build();

module.exports = { getUserData };
