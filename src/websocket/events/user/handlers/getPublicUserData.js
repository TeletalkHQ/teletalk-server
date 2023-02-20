const { services } = require("@/services");

const { validators } = require("@/validators");

const getPublicUserData = async (_socket, data) => {
  const { userId } = data;

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

module.exports = { getPublicUserData };
