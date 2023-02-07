const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const { validators } = require("@/validators");

const tryToSendMessage = async (req) => {
  const {
    currentUserId,
    body: { participantId, message },
  } = req;

  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await await services
    .sendPrivateMessage()
    .run({ currentUserId, participantId, message });

  return {
    chatId,
    newMessage,
  };
};

const sendPrivateMessage = controllerBuilder
  .create()
  .body(tryToSendMessage)
  .build();

module.exports = { sendPrivateMessage };
