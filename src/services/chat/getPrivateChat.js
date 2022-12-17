const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const { errorThrower } = require("utility-store/src/functions/utilities");

const { errors } = require("@/variables/errors");

const PrivateChat = models.database.mongoDb.PrivateChat;

const getPrivateChat = serviceBuilder
  .create()
  .body(async ({ chatId }) => {
    const chat = await PrivateChat.findOne({ chatId });

    errorThrower(!chat, () => errors.CHAT_NOT_EXIST);

    return chat;
  })
  .build();

module.exports = { getPrivateChat };
