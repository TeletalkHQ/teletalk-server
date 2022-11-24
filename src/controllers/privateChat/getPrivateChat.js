const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToGetPrivateChatMessages = async (currentUser, chatId) => {
  await validators.chatId(chatId);
  const privateChat = await services.getPrivateChat(currentUser, chatId);
  return privateChat;
};

const responseToGetMessages = (privateChat, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    privateChat,
  });
};

const catchGetMessages = commonFunctionalities.controllerCatchResponse;

const getPrivateChat = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { chatId },
    currentUser,
  } = req;
  (
    await trier(getPrivateChat.name).tryAsync(
      tryToGetPrivateChatMessages,
      currentUser,
      chatId
    )
  )
    .executeIfNoError(responseToGetMessages, res)
    .catch(catchGetMessages, res);
};

module.exports = { getPrivateChat };
