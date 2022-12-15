const { models } = require("@/models");

const { errorThrower } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");

const PrivateChat = models.database.mongoDb.PrivateChat;

const getPrivateChat = async (
  { chatId },
  projections = {
    __v: 0,
    //TODO: Update with service classes
    _id: 0,
    "messages._id": 0,
    "participants._id": 0,
  },
  options = { lean: true }
) => {
  const chat = await PrivateChat.findOne({ chatId }, projections, options);

  errorThrower(!chat, () => errors.CHAT_NOT_EXIST);

  return chat;
};

module.exports = { getPrivateChat };
