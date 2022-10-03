const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { getUserData } = require("@/services/userServices");

const tryToGetUserData = async (privateId) => {
  const user = await getUserData(privateId);
  return user;
};

const responseToGetUserData = (user, res) => {
  commonFunctionalities.controllerSuccessResponse(res, { user });
};

const catchGetUserData = commonFunctionalities.controllerCatchResponse;

const getUserDataController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { privateId } = req.body;

  (
    await trier(getUserDataController.name).tryAsync(
      tryToGetUserData,
      privateId
    )
  )
    .executeIfNoError(responseToGetUserData, res)
    .catch(catchGetUserData);
};

module.exports = { getUserData: getUserDataController };
