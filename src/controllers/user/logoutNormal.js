const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToLogoutNormal = async (data) => {
  return await services.logoutUser(data);
};

const responseToLogoutNormal = (data, res) => {
  commonFunctionalities.controllerSuccessResponse(res, data);
};

const catchLogoutNormal = commonFunctionalities.controllerErrorResponse;

const logoutNormal = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId } = req;

  (
    await trier(logoutNormal.name).tryAsync(tryToLogoutNormal, {
      currentUserId,
    })
  )
    .executeIfNoError(responseToLogoutNormal, res)
    .catch(catchLogoutNormal, res);
};

module.exports = { logoutNormal };
