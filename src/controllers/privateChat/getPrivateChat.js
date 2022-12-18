const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToGetPrivateChatMessages = async (data) => {
  return (await services.getPrivateChat.run(data)).exclude().result();
};

const responseToGetMessages = (privateChat, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    privateChat,
  });
};

const catchGetMessages = commonFunctionalities.controllerErrorResponse;

//TODO: Add tests for getPrivateChat
const getPrivateChat = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { chatId },
  } = req;

  await validators.chatId(chatId);

  await trier(getPrivateChat.name)
    .tryAsync(tryToGetPrivateChatMessages, {
      chatId,
    })
    .executeIfNoError(responseToGetMessages, res)
    .catch(catchGetMessages, res)
    .runAsync();
};

module.exports = { getPrivateChat };
