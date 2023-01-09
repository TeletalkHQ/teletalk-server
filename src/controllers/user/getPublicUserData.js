const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToGetPublicUserData = async (req) => {
  const { userId } = req.body;

  const user = await services.getTargetUserData({
    userId,
  });

  return {
    publicUserData: {
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
  .body(tryToGetPublicUserData)
  .build();

module.exports = { getPublicUserData };
