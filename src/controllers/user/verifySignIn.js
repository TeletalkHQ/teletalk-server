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

const fixToken = async (sessions, userData) => {
  const token = userPropsUtilities.getTokenFromUserObject({
    sessions,
  });
  if (token) return token;

  const newToken = await generateNewToken(userData);
  await services.addNewToken().run({ userId: userData.userId, newToken });
  return newToken;
};
const dataIfUserExist = async (sessions, userData) => {
  const token = await fixToken(sessions, userData);
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

const tryToSignInUser = async (tokenPayload) => {
  const cellphone = userPropsUtilities.extractCellphone(tokenPayload);

  const foundUser = (await services.findOneUser(cellphone)) || {};
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

const responseToSignInUser = ({ requiredFieldsIndex, responseData }, res) => {
  commonFunctionalities.controllerSuccessResponse(
    res,
    responseData,
    requiredFieldsIndex
  );
};

const catchSignInUser = commonFunctionalities.controllerErrorResponse;

const verifySignIn = async (req = expressRequest, res = expressResponse) => {
  const { authData } = req;

  await trier(verifySignIn.name)
    .tryAsync(tryToSignInUser, authData.payload)
    .executeIfNoError(responseToSignInUser, res)
    .catch(catchSignInUser, res)
    .runAsync();
};

module.exports = { verifySignIn };
