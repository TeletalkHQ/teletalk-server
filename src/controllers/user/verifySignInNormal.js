const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const generateNewMainToken = async (userData) => {
  return await authManager.tokenSigner({
    ...userPropsUtilities.extractCellphone(userData),
    userId: userData.userId,
  });
};

const handleGetMainToken = async (tokens, userData) => {
  const mainToken = userPropsUtilities.getTokenFromUserObject({
    tokens,
  });
  if (mainToken) return mainToken;

  const newMainToken = await generateNewMainToken(userData);
  await services.saveNewMainToken(
    userPropsUtilities.extractCellphone(userData),
    newMainToken
  );
  return newMainToken;
};
const dataIfUserExist = async (tokens, userData) => {
  const mainToken = await handleGetMainToken(tokens, userData);
  return {
    ...userData,
    mainToken,
    newUser: false,
  };
};
const dataIfUserNotExist = () => ({
  newUser: true,
});

const fixUserData = async (isUserExist, userData, tokens) => {
  return {
    user: isUserExist
      ? await dataIfUserExist(tokens, userData)
      : dataIfUserNotExist(),
  };
};

const tryToSignInNormalUser = async (tokenPayload) => {
  const cellphone = userPropsUtilities.extractCellphone(tokenPayload);

  const foundUser =
    (await services.userFinder(
      cellphone,
      { lean: true },
      {
        "chatInfo._id": 0,
        "contacts._id": 0,
      }
    )) || {};
  const { tokens, ...userData } = userPropsUtilities.extractUserData(foundUser);

  const isUserExist = !!userData.userId;
  //? 0 stance for newUser:false and 1 for newUser:true
  const requiredFieldsIndex = isUserExist ? 0 : 1;
  const responseData = await fixUserData(isUserExist, userData, tokens);

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

const catchSignInNormalUser = commonFunctionalities.controllerErrorResponse;

const verifySignInNormal = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { authData } = req;

  (
    await trier(verifySignInNormal.name).tryAsync(
      tryToSignInNormalUser,
      authData.payload
    )
  )
    .executeIfNoError(responseToSignInNormalUser, res)
    .catch(catchSignInNormalUser, res);
};

module.exports = { verifySignInNormal };
