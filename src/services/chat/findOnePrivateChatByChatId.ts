const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const PrivateChat = models.database.mongoDb.PrivateChat;

const findOnePrivateChatByChatId = serviceBuilder
  .create()
  .body(async ({ chatId }) => await PrivateChat.findOne({ chatId }))
  .build();

module.exports = { findOnePrivateChatByChatId };
