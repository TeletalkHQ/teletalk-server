const { randomID } = require("~/functions/utilities/randomID");

const {
  PrivateChatModel,
} = require("~/models/chatModels/privateChatMongoModel");

const {
  chatModel: {
    properties: {
      messageIdModel: { properties: messageIdModel },
      chatIdModel: { properties: chatIdModel },
    },
  },
} = require("~/models/chatModels/chatModel");

const { userFinder } = require("~/functions/helpers/userFinder");
const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");
const { errorThrower } = require("~/functions/utilities/utils");

const sendMessagePrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      db: { user },
      body: { participantID, message },
    } = req;

    // const chatFromUser = user.chats.find((chat) => chat.chatId === chatId);

    // if (!chatFromUser) {
    // 	const error = chatErrorTemplate.CHAT_NOT_EXIST;
    // 	throw error;
    // }

    const targetUser = await userFinder({ privateID: participantID });

    errorThrower(!targetUser, userErrorTemplate.USER_NOT_EXIST);

    const chat = await PrivateChatModel.findOne({
      "participants.participantID": {
        $all: [user.privateID, targetUser.privateID],
      },
    });

    let chatId = chat?.chatId;

    const newMessage = {
      message,
      messageId: randomID(messageIdModel.maxlength.value),
      messageSender: { senderID: user.privateID },
    };

    if (!chat) {
      // const error = chatErrorTemplate.CHAT_NOT_EXIST;
      // throw error;

      chatId = randomID(chatIdModel.maxlength.value);

      const privateChat = new PrivateChatModel({
        chatId,
        participants: [
          { participantID: user.privateID },
          { participantID: targetUser.privateID },
        ],
        messages: [newMessage],
      });

      await privateChat.save();

      await user.updateOne({ chats: { chatId } });
      await targetUser.updateOne({ chats: { chatId } });
      res.status(200).send({ newMessage, chatId });
    } else if (chat) {
      chat.messages.push(newMessage);

      await chat.updateOne({ messages: chat.messages });

      res.status(200).send({ newMessage, chatId });
    }

    // const checkParticipant = chat.participants.find(
    // 	(participant) => participant.participantID === participantID,
    // );

    // if (!checkParticipant) {
    // 	const error = chatErrorTemplate.PARTICIPANT_NOT_EXIST;
    // 	throw error;
    // }

    // const checkUserParticipation = chat.participants.find(
    // 	(participant) => participant.participantID === user.privateID,
    // );

    // if (!checkUserParticipation) {
    // 	const error = chatErrorTemplate.USER_NO_LONGER_PARTICIPANT;
    // 	throw error;
    // }
  } catch (error) {
    logger.log("sendMessagePrivateChatController catch", error);
    res.errorCollector({ data: { error } });
    res.errorResponser();
  }
};

module.exports = { sendMessagePrivateChatController };
