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

const catchGetWelcomeMessage = commonFunctionalities.controllerCatchResponse;

const getWelcomeMessageOtherController = async (
  _ = expressRequest,
  res = expressResponse
) => {
  (
    await trier(getWelcomeMessageOtherController).tryAsync(
      tryToGetWelcomeMessage
    )
  )
    .executeIfNoError(responseToGetWelcomeMessage, res)
    .catch(catchGetWelcomeMessage);
};

module.exports = { getWelcomeMessageOtherController };
