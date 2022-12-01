const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const tryToGetChatsLastMessage = async (currentUser) => {
  const chatsWithLastMessages = await services.getChatsLastMessages(
    currentUser
  );
  return chatsWithLastMessages;
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
  const { currentUser } = req;

  (
    await trier(getChatsLastMessage.name).tryAsync(
      tryToGetChatsLastMessage,
      currentUser
    )
  )
    .executeIfNoError(responseToGetChatsLastMessage, res)
    .catch(catchGetChatsLastMessage, res);
};

module.exports = { getChatsLastMessage };