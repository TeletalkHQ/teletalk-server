const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToGetPrivateChatMessages = async (data) => {
  //TODO: Move chatId validator to somewhere else
  await validators.chatId(data.chatId);
  return await services.getPrivateChat(data);
};

const responseToGetMessages = (privateChat, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    privateChat,
  });
};

const catchGetMessages = commonFunctionalities.controllerErrorResponse;

const getPrivateChat = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { chatId },
  } = req;
  (
    await trier(getPrivateChat.name).tryAsync(tryToGetPrivateChatMessages, {
      chatId,
    })
  )
    .executeIfNoError(responseToGetMessages, res)
    .catch(catchGetMessages, res);
};

module.exports = { getPrivateChat };
