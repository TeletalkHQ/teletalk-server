const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const checkCurrentUserStatus = async (req, res, next) => {
  const token = authManager.getTokenFromRequest(req);
  const { payload: userData } = req.authData;

  return await trier(checkCurrentUserStatus.name)
    .tryAsync(tryToCheckCurrentUserStatus, userData, token)
    .executeIfNoError(executeIfNoError, next)
    .catch(catchCheckCurrentUserStatus, res)
    .runAsync();
};

const tryToCheckCurrentUserStatus = async (userData, token) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);

  const currentUser = await services.findOneUser(cellphone);
  //TODO Add tests when user not exist
  errorThrower(!currentUser, () => ({
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  }));

  const isTokenExistOnUserData = currentUser.sessions.find(
    (t) => t.token === token
  );
  //TODO: Add test for logout
  errorThrower(!isTokenExistOnUserData, errors.CURRENT_USER_NOT_EXIST);

  return { currentUser, ok: true };
};

const executeIfNoError = (_data, next) => {
  next();
};

const catchCheckCurrentUserStatus = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

module.exports = { checkCurrentUserStatus };
