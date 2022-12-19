const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetUserData = async (authData) => {
  const { sessions, ...userData } = await services
    .getUserData()
    .exclude()
    .run({ userId: authData.payload.userId });

  return {
    user: userData,
  };
};

const responseToGetUserData = (userData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, userData);
};

const catchGetUserData = commonFunctionalities.controllerErrorResponse;

const getUserData = async (req = expressRequest, res = expressResponse) => {
  const { authData } = req;

  await trier(getUserData.name)
    .tryAsync(tryToGetUserData, authData)
    .executeIfNoError(responseToGetUserData, res)
    .catch(catchGetUserData, res)
    .runAsync();
};

module.exports = { getUserData };
