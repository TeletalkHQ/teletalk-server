const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");
const { validators } = require("@/validators");

const tryToGetPublicUserData = async (req) => {
  const { userId } = req.body;

  await validators.userId(userId);

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
