const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("@/functions/utilities/utilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

//TODO: Add some tests, this controller has no any tests

const fixUserData = (foundUser) => {
  const { tokens, ...userData } = userPropsUtilities.extractUserData(foundUser);
  return {
    user: {
      ...userData,
      mainToken: userPropsUtilities.getTokenFromUserObject({
        tokens,
      }),
    },
  };
};

const tryToCheckUserStatus = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);
  const foundUser = await services.userFinder(
    cellphone,
    { lean: true },
    { "chatInfo._id": 0, "contacts._id": 0 }
  );
  errorThrower(!foundUser, () => ({ ...errors.USER_NOT_EXIST, cellphone }));
  const fixedUserData = fixUserData(foundUser);

  return fixedUserData;
};

const responseToCheckUserStatus = (userData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, userData);
};

const catchCheckUserStatus = commonFunctionalities.controllerErrorResponse;

const getUserData = async (req = expressRequest, res = expressResponse) => {
  const {
    authData: { payload: userData },
  } = req;

  (await trier(getUserData.name).tryAsync(tryToCheckUserStatus, userData))
    .executeIfNoError(responseToCheckUserStatus, res)
    .catch(catchCheckUserStatus, res);
};

module.exports = { getUserData };
