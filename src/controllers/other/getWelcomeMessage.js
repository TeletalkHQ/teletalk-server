const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const tryToGetWelcomeMessage = async () => {
  return {
    message: "Hey! Welcome to teletalk <3",
  };
};

const responseToGetWelcomeMessage = (message, res) => {
  commonFunctionalities.controllerSuccessResponse(res, message);
};

const catchGetWelcomeMessage = commonFunctionalities.controllerErrorResponse;

const getWelcomeMessage = async (_ = expressRequest, res = expressResponse) => {
  (await trier(getWelcomeMessage).tryAsync(tryToGetWelcomeMessage))
    .executeIfNoError(responseToGetWelcomeMessage, res)
    .catch(catchGetWelcomeMessage);
};

module.exports = { getWelcomeMessage };
