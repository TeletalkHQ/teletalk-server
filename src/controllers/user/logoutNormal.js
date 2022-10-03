const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { logoutUser } = require("@/services/userServices");

const tryToLogoutNormal = async (currentUser) => {
  return await logoutUser(currentUser);
};

const responseToLogoutNormal = (data, res) => {
  commonFunctionalities.controllerSuccessResponse(res, data);
};

const catchLogoutNormal = commonFunctionalities.controllerCatchResponse;

//TODO: Add tests
const logoutNormal = async (req = expressRequest, res = expressResponse) => {
  const { currentUser } = req;

  (await trier(logoutNormal.name).tryAsync(tryToLogoutNormal, currentUser))
    .executeIfNoError(responseToLogoutNormal, res)
    .catch(catchLogoutNormal, res);
};

module.exports = { logoutNormal };
