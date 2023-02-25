const { services } = require("@/services");

const getCurrentUserData = async (socket) => {
  const { currentUserId } = socket;

  const { sessions, ...userData } = await services.getCurrentUserData({
    userId: currentUserId,
  });

  return {
    user: userData,
  };
};

module.exports = { getCurrentUserData };
