const { userUtilities } = require("@/classes/UserUtilities");

const attachCurrentUserId = (req, _res, next) => {
  req.currentUserId = userUtilities.getUserIdFromVerifiedToken(req.authData);

  next();

  return { ok: true };
};

module.exports = { attachCurrentUserId };
