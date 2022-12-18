const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToLogout = async (data) => {
  return (await services.logout.run(data)).result();
};

const responseToLogout = (data, res) => {
  commonFunctionalities.controllerSuccessResponse(res, data);
};

const catchLogout = commonFunctionalities.controllerErrorResponse;

const logout = async (req = expressRequest, res = expressResponse) => {
  const { currentUserId } = req;

  await trier(logout.name)
    .tryAsync(tryToLogout, {
      currentUserId,
    })
    .executeIfNoError(responseToLogout, res)
    .catch(catchLogout, res)
    .runAsync();
};

module.exports = { logout };
