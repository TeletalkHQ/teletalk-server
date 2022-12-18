//DEPRECATED
const { trier } = require("utility-store/src/classes/Trier");

const { PrivateChat } = require("@/models/database/mongoDb/privateChat");

const getChatsLastMessages = async (data) => {
  (
    await trier(getChatsLastMessages.name).tryAsync(
      tryToGetChatsLastMessages,
      data
    )
  ).printAndThrow();
};

const tryToGetChatsLastMessages = async ({ currentUserId }) => {
  const chats = await PrivateChat.find({
    "participants.participantId": currentUserId,
  });

  return chats.map(createChatWithLastMessage);
};

const createChatWithLastMessage = (chat) => {
  const { messages } = chat;
  const lastMessage = messages?.at(-1);

  return {
    ...chat,
    messages: [lastMessage],
  };
};

module.exports = { getChatsLastMessages };
