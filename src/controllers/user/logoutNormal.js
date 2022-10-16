const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToLogoutNormal = async (currentUser) => {
  return await services.logoutUser(currentUser);
};

const responseToLogoutNormal = (data, res) => {
  commonFunctionalities.controllerSuccessResponse(res, data);
};

const catchLogoutNormal = commonFunctionalities.controllerCatchResponse;

const logoutNormal = async (req = expressRequest, res = expressResponse) => {
  const { currentUser } = req;

  (await trier(logoutNormal.name).tryAsync(tryToLogoutNormal, currentUser))
    .executeIfNoError(responseToLogoutNormal, res)
    .catch(catchLogoutNormal, res);
};

module.exports = { logoutNormal };
