const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToSendMessage = async (currentUser, participantId, message) => {
  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await services.sendPrivateMessage(
    currentUser,
    participantId,
    message
  );

  return {
    chatId,
    newMessage,
  };
};

const responseToSendMessage = (responseData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, responseData);
};

const catchSendMessage = commonFunctionalities.controllerCatchResponse;

const sendMessage = async (req = expressRequest, res = expressResponse) => {
  const {
    currentUser,
    body: { participantId, message },
  } = req;

  (
    await trier(sendMessage.name).tryAsync(
      tryToSendMessage,
      currentUser,
      participantId,
      message
    )
  )
    .executeIfNoError(responseToSendMessage, res)
    .catch(catchSendMessage, res);
};

module.exports = { sendMessage };
