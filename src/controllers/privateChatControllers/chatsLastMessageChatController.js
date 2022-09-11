const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { getChatsLastMessages } = require("@/services/chatServices");

const tryToGetChatsLastMessage = async (currentUser) => {
  const chatsWithLastMessages = await getChatsLastMessages(currentUser);
  return chatsWithLastMessages;
};

const responseToGetChatsLastMessage = (chatsWithLastMessages, res) => {
  commonFunctionalities.controllerSuccessResponse(res, {
    chatsWithLastMessages,
  });
};

const catchGetChatsLastMessage = commonFunctionalities.controllerCatchResponse;

const chatsLastMessageChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  const { currentUser } = req;

  (
    await trier(chatsLastMessageChatController.name).tryAsync(
      tryToGetChatsLastMessage,
      currentUser
    )
  )
    .executeIfNoError(responseToGetChatsLastMessage, res)
    .catch(catchGetChatsLastMessage, res);
};

module.exports = { chatsLastMessageChatController };
