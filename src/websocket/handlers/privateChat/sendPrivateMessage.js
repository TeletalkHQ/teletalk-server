const { services } = require("@/services");

const { validators } = require("@/validators");

const sendPrivateMessage = async (socket = ioSocket, data) => {
  const { currentUserId } = socket;
  const { participantId, message } = data;

  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await await services
    .sendPrivateMessage()
    .run({ currentUserId, participantId, message });

  socket.to(currentUserId).to(participantId).broadcast({
    chatId,
    newMessage,
  });
};

module.exports = { sendPrivateMessage };
