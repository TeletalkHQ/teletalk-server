//!DEPRECATED
//!DEPRECATED
//!DEPRECATED
const { errorThrower } = require("@/functions/utilities/utils");
const { randomMaker } = require("@/classes/RandomMaker");

const {
  chatErrors: { CHAT_EXIST },
} = require("@/variables/errors/chatErrors");
const {
  userErrors: { USER_NOT_EXIST },
} = require("@/variables/errors/userErrors");

const {
  PrivateChatMongoModel,
} = require("@/models/chatModels/privateChatMongoModel");

const {
  chatModels: { chatIdModel },
} = require("@/models/chatModels/chatModels");
const { userFinder } = require("@/models/userModels/userModelFunctions");

const startChatPrivateChatController = async (
  req = expressRequest,
  res = expressResponse
) => {
  try {
    const {
      body: { privateId: targetUserId },
      db: { user: client },
    } = req;

    const targetUser = await userFinder({ privateId: targetUserId });

    errorThrower(!targetUser, USER_NOT_EXIST);

    //TODO Use $and for test
    const chat = await PrivateChatMongoModel.findOne({
      "participants.participantId": {
        $all: [client.privateId, targetUser.privateId],
      },
    });

    errorThrower(chat, CHAT_EXIST);

    const chatId = randomMaker.randomId(chatIdModel.maxlength.value);

    const privateChat = new PrivateChatMongoModel({
      chatId,
      participants: [
        { participantId: client.privateId },
        { participantId: targetUser.privateId },
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
