const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { services } = require("@/services/services");

const { errors } = require("@/variables/errors/errors");

const tryToFindCurrentUserFromDb = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);

  const currentUser = await services.userFinder(cellphone, {});
  //TODO Add tests when user not exist
  errorThrower(customTypeof.isNull(currentUser), () => ({
    ...errors.USER_NOT_EXIST,
    cellphone,
  }));

  return { currentUser, ok: true };
};

const executeIfNoError = ({ currentUser }, req, next) => {
  req.currentUser = currentUser;
  next();
};

const catchFindCurrentUserFromDb = (error, res) => {
  commonFunctionalities.controllerCatchResponse(error, res);
  return { ok: false };
};

const findCurrentUserFromDb = async (req, res, next) => {
  const { payload: userData } = req.authData;

  return (
    await trier(findCurrentUserFromDb.name).tryAsync(
      tryToFindCurrentUserFromDb,
      userData
    )
  )
    .executeIfNoError(executeIfNoError, req, next)
    .catch(catchFindCurrentUserFromDb, res)
    .result();
};

module.exports = { findCurrentUserFromDb };
