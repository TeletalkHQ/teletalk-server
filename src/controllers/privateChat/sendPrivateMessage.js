const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToSendMessage = async (data) => {
  //CLEANME: Move to another try block
  await validators.participantId(data.participantId);
  await validators.messageText(data.message);

  const { chatId, newMessage } = await services.sendPrivateMessage(data);

  return {
    chatId,
    newMessage,
  };
};

const responseToSendMessage = (responseData, res) => {
  commonFunctionalities.controllerSuccessResponse(res, responseData);
};

const catchSendMessage = commonFunctionalities.controllerErrorResponse;

const sendPrivateMessage = async (
  req = expressRequest,
  res = expressResponse
) => {
  const {
    currentUserId,
    body: { participantId, message },
  } = req;

  (
    await trier(sendPrivateMessage.name).tryAsync(tryToSendMessage, {
      currentUserId,
      participantId,
      message,
    })
  )
    .executeIfNoError(responseToSendMessage, res)
    .catch(catchSendMessage, res);
};

module.exports = { sendPrivateMessage };
