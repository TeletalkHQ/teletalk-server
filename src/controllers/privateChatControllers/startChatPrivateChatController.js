//!DEPRECATED

const { chatErrorTemplate } = require("~/variables/errors/chatErrorTemplate");
const { userErrorTemplate } = require("~/variables/errors/userErrorTemplate");
const { userFinder } = require("~/functions/helpers/userFinder");
const { randomID } = require("~/functions/utilities/randomID");

const { PrivateChatModel } = require("~/models/chatModels/privateChat.mongo");

const { chatModel } = require("~/models/chatModels/chat.model");
const { errorThrower } = require("~/functions/utilities/utils");

const startChatPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { privateID: targetUserID },
      db: { user: client },
    } = req;

    const targetUser = await userFinder({ privateID: targetUserID });

    errorThrower(!targetUser, userErrorTemplate.USER_NOT_EXIST);

    //TODO Use $and for test
    const chat = await PrivateChatModel.findOne({
      "participants.participantID": {
        $all: [client.privateID, targetUser.privateID],
      },
    });

    errorThrower(chat, chatErrorTemplate.CHAT_EXIST);

    const chatID = randomID(chatModel.chatID.maxlength.value);

    const privateChat = new PrivateChatModel({
      chatID,
      participants: [
        { participantID: client.privateID },
        { participantID: targetUser.privateID },
      ],
    });

    await privateChat.save();

    await client.updateOne({ chats: { chatID } });
    await targetUser.updateOne({ chats: { chatID } });

    res.status(200).json({ client, targetUser });
  } catch (error) {
    res.errorCollector({ data: { error } });
    logger.log("startChatPrivateChatController catch", error).log();

    res.errorResponser();
  }
};

module.exports = { startChatPrivateChatController };
