const { errorThrower } = require("utility-store/src/utilities/utilities");
const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonUtilities } = require("@/classes/CommonUtilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const checkCurrentUserStatus = async (req, res, next) => {
  return await trier(checkCurrentUserStatus.name)
    .tryAsync(tryToCheckCurrentUserStatus, req)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckCurrentUserStatus, res)
    .runAsync();
};

const tryToCheckCurrentUserStatus = async (req) => {
  const token = authManager.getTokenFromRequest(req);
  const {
    payload: { tokenId },
  } = req.authData;

  const currentUser = await services.findOneUser({ userId: tokenId });

  const error = errors.CURRENT_USER_NOT_EXIST;

  errorThrower(!currentUser, {
    ...error,
    wrongTokenId: tokenId,
  });

  errorThrower(currentUser.userId !== tokenId, {
    ...error,
    wrongTokenId: tokenId,
  });

  const isSessionExist = currentUser.sessions.some((t) => t.token === token);

  errorThrower(!isSessionExist, {
    ...error,
    isSessionExist,
  });

  return {
    currentUser,
    ok: true,
  };
};

const executeIfNoError = (_data, next) => {
  next();
};

const catchCheckCurrentUserStatus = (error, res) => {
  commonUtilities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { checkCurrentUserStatus };
