//DEPRECATED
const { trier } = require("utility-store/src/classes/Trier");

const { PrivateChat } = require("@/models/database/mongoDb/privateChat");

const getChatsLastMessages = async ({ currentUserId }) => {
  const tryToGetChatsLastMessages = async () => {
    const chats = await PrivateChat.find({
      "participants.participantId": currentUserId,
    });

    return chats.map((chat) => {
      const { messages } = chat;
      const lastMessage = messages?.at(-1);

      return {
        ...chat,
        messages: [lastMessage],
      };
    });
  };

  (
    await trier(getChatsLastMessages.name).tryAsync(tryToGetChatsLastMessages)
  ).printAndThrow();
};

module.exports = { getChatsLastMessages };
