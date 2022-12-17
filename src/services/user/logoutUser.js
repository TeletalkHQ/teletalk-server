const { commonServices } = require("@/services/common");

const logoutUser = async ({ currentUserId }) => {
  //FIXME: Remove current session, not all of them
  const currentUser = await commonServices.findUserById(currentUserId);
  currentUser.sessions = [];
  await currentUser.save();
  return { ok: true };
};

module.exports = { logoutUser };
