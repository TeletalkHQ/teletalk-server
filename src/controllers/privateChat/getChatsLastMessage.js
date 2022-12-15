const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetChatsLastMessage = async (data) => {
  return await services.getChatsLastMessages(data);
};

const responseToGetChatsLastMessage = (chatsWithLastMessages, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    chatsWithLastMessages,
  });
};

const catchGetChatsLastMessage = commonFunctionalities.controllerErrorResponse;

const getChatsLastMessage = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUserId } = req;

  (
    await trier(getChatsLastMessage.name).tryAsync(tryToGetChatsLastMessage, {
      currentUserId,
    })
  )
    .executeIfNoError(responseToGetChatsLastMessage, res)
    .catch(catchGetChatsLastMessage, res);
};

module.exports = { getChatsLastMessage };
