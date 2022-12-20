const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetPublicUserInfo = async (req) => {
  const { userId } = req.body;

  const user = await services.getUserData().run({ userId });

  return {
    publicUserInfo: {
      bio: user.bio,
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user.userId,
      username: user.username,
    },
  };
};

const getPublicUserData = controllerBuilder
  .create()
  .body(tryToGetPublicUserInfo)
  .build();

module.exports = { getPublicUserData };
