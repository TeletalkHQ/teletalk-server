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
  .description("Use for Get chats last message")
  .build();

const getPrivateChat = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getPrivateChat")
  .statusCode(200)
  .description("Use for get all messages")
  .inputFields({ chatId: fields.single.chatId })
  .outputFields([
    {
      //TODO: Top props check
      privateChat: fields.collection.privateChat,
    },
  ])
  .build();

const getAllPrivateChats = privateChatRouteBuilder
  .create()
  .method("get")
  .url("/getAllPrivateChats")
  .statusCode(200)
  .description("Use for get all private chats with messages")
  .outputFields([
    {
      privateChats: fields.statics.array(fields.collection.privateChat),
    },
  ])
  .build();

const sendPrivateMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/sendPrivateMessage")
  .statusCode(200)
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
  getAllPrivateChats,
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
