const { services } = require("@/services");

const updateOnlineStatus = async ({ userId }) => {
  await services.updateOnlineStatus().run({
    currentUserId: userId,
  });
};

module.exports = {
  updateOnlineStatus,
};
