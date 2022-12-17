const { trier } = require("utility-store/src/classes/Trier");

const { authManager } = require("@/classes/AuthManager");
const { commonFunctionalities } = require("@/classes/CommonFunctionalities");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

const { services } = require("@/services");

const generateNewToken = async (userData) => {
  return await authManager.tokenSigner({
    ...userPropsUtilities.extractCellphone(userData),
    userId: userData.userId,
  });
};

const handleGetToken = async (sessions, userData) => {
  const token = userPropsUtilities.getTokenFromUserObject({
    sessions,
  });
  if (token) return token;

  const newToken = await generateNewToken(userData);
  await services.saveNewToken(
    userPropsUtilities.extractCellphone(userData),
    newToken
  );
  return newToken;
};
const dataIfUserExist = async (sessions, userData) => {
  const token = await handleGetToken(sessions, userData);
  return {
    ...userData,
    token,
    newUser: false,
  };
};
const dataIfUserNotExist = () => ({
  newUser: true,
});

const fixUserData = async (isUserExist, userData, sessions) => {
  return {
    user: isUserExist
      ? await dataIfUserExist(sessions, userData)
      : dataIfUserNotExist(),
  };
};

const tryToSignInNormalUser = async (tokenPayload) => {
  const cellphone = userPropsUtilities.extractCellphone(tokenPayload);

  const foundUser = (await services.findUser(cellphone)) || {};
  const { sessions, ...userData } =
    userPropsUtilities.extractUserData(foundUser);

  const isUserExist = !!userData.userId;
  //? 0 stance for newUser:false and 1 for newUser:true
  const requiredFieldsIndex = isUserExist ? 0 : 1;
  const responseData = await fixUserData(isUserExist, userData, sessions);

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
