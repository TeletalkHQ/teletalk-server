const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");
const { authManager } = require("@/classes/AuthManager");

const logout = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId } = req;

  const currentToken = authManager.getTokenFromRequest(req);

  await trier(logout.name)
    .tryAsync(tryToLogout, {
      currentUserId,
      currentToken,
    })
    .executeIfNoError(responseToLogout, res)
    .catch(catchLogout, res)
    .runAsync();
};

const tryToLogout = async (data) => {
  return await services.logout().run(data);
};

const responseToLogout = (data, res) => {
  commonFunctionalities.controllerSuccessResponse(res, data);
};

const catchLogout = commonFunctionalities.controllerErrorResponse;

module.exports = { logout };
