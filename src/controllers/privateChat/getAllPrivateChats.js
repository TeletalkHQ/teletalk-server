const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetAllPrivateChats = async (participantId) => {
  return await services.getAllPrivateChats(participantId);
};

const responseToGetAllPrivateChats = (privateChats, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    privateChats,
  });
};

const catchGetAllChats = commonFunctionalities.controllerErrorResponse;

const getAllPrivateChats = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    currentUser: { userId },
  } = req;
  (
    await trier(getAllPrivateChats.name).tryAsync(
      tryToGetAllPrivateChats,
      userId
    )
  )
    .executeIfNoError(responseToGetAllPrivateChats, res)
    .catch(catchGetAllChats, res);
};

module.exports = { getAllPrivateChats };
