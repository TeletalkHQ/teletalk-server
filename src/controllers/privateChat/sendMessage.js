const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { sendPrivateMessage } = require("@/services/chatServices");

const {
  chatValidators: { participantIdValidator, messageTextValidator },
} = require("@/validators/chatValidators");

const tryToSendMessage = async (currentUser, participantId, message) => {
  await participantIdValidator(participantId);
  await messageTextValidator(message);

  const { chatId, newMessage } = await sendPrivateMessage(
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