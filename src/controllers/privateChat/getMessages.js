const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToGetMessages = async (currentUser, chatId) => {
  await validators.chatId(chatId);
  const privateChatMessages = await services.getPrivateChatMessages(
    currentUser,
    chatId
  );
  return privateChatMessages;
};

const responseToGetMessages = (privateChatMessages, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    messages: privateChatMessages,
  });
};

const catchGetMessages = commonFunctionalities.controllerCatchResponse;

const getMessages = async (req = expressRequest, res = expressResponse) => {
  const {
    body: { chatId },
    currentUser,
  } = req;
  (
    await trier(getMessages.name).tryAsync(
      tryToGetMessages,
      currentUser,
      chatId
    )
  )
    .executeIfNoError(responseToGetMessages, res)
    .catch(catchGetMessages, res);
};

module.exports = { getMessages };
