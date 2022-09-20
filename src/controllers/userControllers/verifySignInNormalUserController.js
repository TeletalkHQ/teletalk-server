const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { userFinder } = require("@/services/userServices");

const fixUserData = (isUserExist, defaultUserObject, tokens) => {
  return {
    user: isUserExist
      ? {
          ...defaultUserObject,
          mainToken: userPropsUtilities.getTokenFromUserObject({
            tokens,
          }),
          newUser: false,
        }
      : { newUser: true },
  };
};

const tryToSignInNormalUser = async (userData) => {
  const cellphone = userPropsUtilities.extractCellphone(userData);

  const foundUser = (await userFinder(cellphone)) || {};
  const { tokens, ...defaultUserObject } =
    userPropsUtilities.extractUserData(foundUser);

  const isUserExist = !!defaultUserObject.privateId;
  //? 0 stance for newUser:false and 1 for newUser:true
  const requiredFieldsIndex = isUserExist ? 0 : 1;
  const responseData = fixUserData(isUserExist, defaultUserObject, tokens);

  return {
    requiredFieldsIndex,
    responseData,
  };
};

const responseToSignInNormalUser = (
  { requiredFieldsIndex, responseData },
  res
) => {
  commonFunctionalities.controllerSuccessResponse(
    res,
    responseData,
    requiredFieldsIndex
  );
};

const catchSignInNormalUser = commonFunctionalities.controllerCatchResponse;

const verifySignInNormalUserController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { authData } = req;

  (
    await trier(verifySignInNormalUserController.name).tryAsync(
      tryToSignInNormalUser,
      authData.payload
    )
  )
    .executeIfNoError(responseToSignInNormalUser, res)
    .catch(catchSignInNormalUser, res);
};

module.exports = { verifySignInNormalUserController };
