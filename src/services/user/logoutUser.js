const { commonServices } = require("@/services/common");

const logoutUser = async ({ currentUserId }) => {
  //FIXME: Remove current session
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });
  currentUser.sessions = [];
  await currentUser.save();
  return { ok: true };
};

module.exports = { logoutUser };
