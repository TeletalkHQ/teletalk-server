//!DEPRECATED
//!DEPRECATED
//!DEPRECATED

const { randomId } = require("@/functions/utilities/randomId");

const {
  chatErrors: {
    properties: { CHAT_EXIST },
  },
} = require("@/variables/errors/chatErrors");
const {
  userErrors: {
    properties: { USER_NOT_EXIST },
  },
} = require("@/variables/errors/userErrors");

const {
  PrivateChatMongoModel,
} = require("@/models/chatModels/privateChatMongoModel");

const {
  chatModels: {
    properties: {
      chatIdModel: { properties: chatIdModel },
    },
  },
} = require("@/models/chatModels/chatModels");
const { errorThrower } = require("@/functions/utilities/utilsNoDeps");
const { userFinder } = require("@/models/userModels/userModelFunctions");

const startChatPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { privateId: targetUserID },
      db: { user: client },
    } = req;

    const targetUser = await userFinder({ privateId: targetUserID });

    errorThrower(!targetUser, USER_NOT_EXIST);

    //TODO Use $and for test
    const chat = await PrivateChatMongoModel.findOne({
      "participants.participantID": {
        $all: [client.privateId, targetUser.privateId],
      },
    });

    errorThrower(chat, CHAT_EXIST);

    const chatId = randomId(chatIdModel.maxlength.value);

    const privateChat = new PrivateChatMongoModel({
      chatId,
      participants: [
        { participantID: client.privateId },
        { participantID: targetUser.privateId },
      ],
    });

    await privateChat.save();

    await client.updateOne({ chats: { chatId } });
    await targetUser.updateOne({ chats: { chatId } });

    res.status(200).json({ client, targetUser });
  } catch (error) {
    res.errorCollector(error);
    logger.log("startChatPrivateChatController catch", error).log();

    res.errorResponser();
  }
};

module.exports = { startChatPrivateChatController };
