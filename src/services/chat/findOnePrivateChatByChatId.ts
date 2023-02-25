import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

const PrivateChat = models.database.mongoDb.PrivateChat;

const findOnePrivateChatByChatId = serviceBuilder
  .create()
  .body(async ({ chatId }) => await PrivateChat.findOne({ chatId }))
  .build();

export { findOnePrivateChatByChatId };
