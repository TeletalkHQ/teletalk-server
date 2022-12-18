const { trier } = require("utility-store/src/classes/Trier");

const { commonFunctionalities } = require("@/classes/CommonFunctionalities");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToSendMessage = async (data) => {
  const { chatId, newMessage } = await (
    await services.sendPrivateMessage.run(data)
  ).result();

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

  const data = {
    currentUserId,
    participantId,
    message,
  };

  const trierInstance = trier(sendPrivateMessage.name)
    .executeIfNoError(responseToSendMessage, res)
    .catch(catchSendMessage, res);

  await trierInstance
    .tryAsync(tryToValidateData, data)
    .tryAsync(tryToSendMessage, data)
    .runAsync();
};

const tryToValidateData = async (data) => {
  await validators.participantId(data.participantId);
  await validators.messageText(data.message);
};

module.exports = { sendPrivateMessage };
