const { trier } = require("utility-store/src/classes/Trier");

const getChatsLastMessages = async ({ currentUserId }) => {
  const tryToGetChatsLastMessages = async () => {
    //FIXME:
    const chats = (await getAllPrivateChats({ currentUserId })) || [];
    const chatWithLastMessages = [];
    //CLEANME: Update with map
    for (const chat of chats) {
      const { messages } = chat;
      const lastMessage = messages?.at(-1);

      chatWithLastMessages.push({
        ...chat,
        messages: [lastMessage],
      });
    }

    return chatWithLastMessages;
  };

  (
    await trier(getChatsLastMessages.name).tryAsync(tryToGetChatsLastMessages)
  ).printAndThrow();
};

module.exports = { getChatsLastMessages };
