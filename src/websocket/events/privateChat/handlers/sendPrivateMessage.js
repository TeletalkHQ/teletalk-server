const { services } = require("@/services");

const { validators } = require("@/validators");

const sendPrivateMessage = async (
  socket = socketIntellisense,
  io = ioIntellisense,
  data
) => {
  const { currentUserId } = socket;
  const { participantId, message } = data;

  await validators.participantId(participantId);
  await validators.messageText(message);

  const { chatId, newMessage } = await await services
    .sendPrivateMessage()
    .run({ currentUserId, participantId, message });

  io.to(currentUserId)
    .to(participantId)
    //TODO: Use customEmit
    .emit("newPrivateChatMessage", { chatId, newMessage });
};

module.exports = { sendPrivateMessage };
