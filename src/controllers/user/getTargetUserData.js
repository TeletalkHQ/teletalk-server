const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetUserData = async (userId) => {
  return await services.getUserData(userId);
};

const responseToGetUserData = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchGetUserData = commonFunctionalities.controllerErrorResponse;

const getTargetUserData = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { userId } = req.body;

  (await trier(getTargetUserData.name).tryAsync(tryToGetUserData, userId))
    .executeIfNoError(responseToGetUserData, res)
    .catch(catchGetUserData, res);
};

module.exports = { getTargetUserData };
