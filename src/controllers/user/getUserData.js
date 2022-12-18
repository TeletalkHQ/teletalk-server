const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { services } = require("@/services");

const { errors } = require("@/variables/errors");

//TODO: Add some tests, this controller has no any tests

//CLEANME: Duplicate in verifySignIn
const fixUserData = (foundUser) => {
  const { sessions, ...userData } =
    userPropsUtilities.extractUserData(foundUser);
  return {
    user: {
      ...userData,
      token: userPropsUtilities.getTokenFromUserObject({
        sessions,
      }),
    },
  };
};

const tryToGetUserData = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);
  const currentUserNotExistError = {
    ...errors.CURRENT_USER_NOT_EXIST,
    cellphone,
  };
  //CLEANME: Use getUserData service
  const foundUser = await services.findOneUser(cellphone);
  errorThrower(!foundUser, currentUserNotExistError);

  const fixedUserData = fixUserData(foundUser);
  errorThrower(!fixedUserData.user.token, currentUserNotExistError);
  return fixedUserData;
};

const responseToGetUserData = (userData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, userData);
};

const catchGetUserData = commonFunctionalities.controllerErrorResponse;

const getUserData = async (req = expressRequest, res = expressResponse) => {
  const {
    authData: { payload: userData },
  } = req;

  (await trier(getUserData.name).tryAsync(tryToGetUserData, userData))
    .executeIfNoError(responseToGetUserData, res)
    .catch(catchGetUserData, res);
};

module.exports = { getUserData };
