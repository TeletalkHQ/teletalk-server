const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const privateChatRouteBuilder = routeBuilder(baseUrls.privateChat);

const getChatsLastMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getChatsLastMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Get chats last message")
  .build();

const getPrivateChat = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getPrivateChat")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get all messages")
  .inputFields({ chatId: fields.single.chatId })
  .outputFields([
    {
      privateChat: fields.statics.object({
        chatId: fields.single.chatId,
        messages: fields.collection.messages,
        participants: fields.collection.participants,
      }),
    },
  ])
  .build();

const sendPrivateMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/sendPrivateMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for send private messages")
  .inputFields({
    message: fields.single.message,
    participantId: fields.single.participantId,
  })
  .outputFields([
    {
      chatId: fields.single.chatId,
      newMessage: fields.statics.object(fields.collection.messageItem),
    },
  ])
  .build();

const routes = {
  getChatsLastMessage,
  getPrivateChat,
  sendPrivateMessage,
};

const privateChat = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  privateChat,
};
