const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const attachCurrentUserId = (req, _res, next) => {
  req.currentUserId = userPropsUtilities.getUserIdFromVerifiedToken(
    req.authData
  );

  next();

  return { ok: true };
};

module.exports = { attachCurrentUserId };
