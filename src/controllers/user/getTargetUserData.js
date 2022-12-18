const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetUserData = async (userId) => {
  return (await services.getUserData.run({ userId })).result();
};

const responseToGetUserData = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchGetUserData = commonFunctionalities.controllerErrorResponse;

//TODO: There are no tests for this api
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
