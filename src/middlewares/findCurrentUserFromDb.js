const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");
const { authManager } = require("@/classes/AuthManager");

//CLEANME: Use utility-store
const { errorThrower } = require("@/functions/utilities/utilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

const tryToFindCurrentUserFromDb = async (userData, token) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);

  const currentUser = await services.userFinder(cellphone, {});
  //TODO Add tests when user not exist
  errorThrower(!currentUser, () => ({
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  }));

  //REFACTOR: Change mainToken and verifyToken to token
  const isTokenExistOnUserData = currentUser.tokens.find(
    (t) => t.mainToken === token
  );
  //TODO: Add test for logout
  errorThrower(!isTokenExistOnUserData, errors.CURRENT_USER_NOT_EXIST);

  return { currentUser, ok: true };
};

const executeIfNoError = ({ currentUser }, req, next) => {
  req.currentUser = currentUser;
  next();
};

const catchFindCurrentUserFromDb = (error, res) => {
  commonFunctionalities.controllerErrorResponse(error, res);
  return { ok: false };
};

const findCurrentUserFromDb = async (req, res, next) => {
  const token = authManager.getTokenFromRequest(req);
  const { payload: userData } = req.authData;

  return (
    await trier(findCurrentUserFromDb.name).tryAsync(
      tryToFindCurrentUserFromDb,
      userData,
      token
    )
  )
    .executeIfNoError(executeIfNoError, req, next)
    .catch(catchFindCurrentUserFromDb, res)
    .result();
};

module.exports = { findCurrentUserFromDb };
