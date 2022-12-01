const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetAllChats = async (currentUser) => {
  const chatInfo = await services.getChatInfo(currentUser);
  return chatInfo;
};

const responseToGetAllChats = (chatInfo, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    chatInfo,
  });
};

const catchGetAllChats = commonFunctionalities.controllerErrorResponse;

const getChatInfo = async (req = expressRequest, res = expressResponse) => {
  const { currentUser } = req;
  (await trier(getChatInfo.name).tryAsync(tryToGetAllChats, currentUser))
    .executeIfNoError(responseToGetAllChats, res)
    .catch(catchGetAllChats, res);
};

module.exports = { getChatInfo };
