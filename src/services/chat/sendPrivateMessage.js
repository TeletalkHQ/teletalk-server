const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { errorThrower } = require("@/utilities/utilities");

const { models } = require("@/models");

const { commonServices } = require("@/services/common");

const { errors } = require("@/variables/errors");

const chatModels = models.native.chat;
const PrivateChat = models.database.mongoDb.PrivateChat;

const sendPrivateMessage = async ({
  currentUserId,
  participantId,
  message,
}) => {
  //CLEANME: Refactor + update with trier
  const currentUser = await commonServices.userFinder({
    userId: currentUserId,
  });

  const targetUser = await commonServices.userFinder(
    { userId: participantId },
    {}
  );
  //TODO Add test for TARGET_USER_NOT_EXIST
  errorThrower(!targetUser, () => errors.TARGET_USER_NOT_EXIST);

  const privateChat = await PrivateChat.findOne({
    "participants.participantId": {
      $all: [currentUser.userId, targetUser.userId],
    },
  });

  const chatId =
    privateChat?.chatId ||
    randomMaker.randomId(chatModels.chatId.maxlength.value);
  const newMessage = {
    message,
    messageId: randomMaker.randomId(chatModels.messageId.maxlength.value),
    sender: { senderId: currentUser.userId },
  };

  if (!privateChat) {
    await PrivateChat.create({
      chatId,
      participants: [
        { participantId: currentUser.userId },
        { participantId: targetUser.userId },
      ],
      messages: [newMessage],
    });
  } else if (privateChat) {
    privateChat.messages.push(newMessage);
    await privateChat.save();
  }

  return { newMessage, chatId };
};

module.exports = { sendPrivateMessage };
