const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { getPrivateChatMessages } = require("@/services/chatServices");

const {
  chatValidators: { chatIdValidator },
} = require("@/validators/chatValidators");

const tryToGetMessages = async (currentUser, chatId) => {
  await chatIdValidator(chatId);
  const privateChatMessages = await getPrivateChatMessages(currentUser, chatId);
  return privateChatMessages;
};

const responseToGetMessages = (privateChatMessages, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    messages: privateChatMessages,
  });
};

const catchGetMessages = commonFunctionalities.controllerCatchResponse;

const getMessagesPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    body: { chatId },
    currentUser,
  } = req;
  (
    await trier(getMessagesPrivateChatController.name).tryAsync(
      tryToGetMessages,
      currentUser,
      chatId
    )
  )
    .executeIfNoError(responseToGetMessages, res)
    .catch(catchGetMessages, res);
};

module.exports = { getMessagesPrivateChatController };
