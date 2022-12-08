const { routeBuilder } = require("@/classes/RouteBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");
const { fields } = require("@/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const privateChatRouteBuilder = routeBuilder(baseUrls.privateChat);

const getChatsLastMessage = privateChatRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getChatsLastMessage")
  .statusCode(200)
  .build();

const getPrivateChat = privateChatRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getPrivateChat")
  .statusCode(200)
  .inputFields({ chatId: fields.single.chatId })
  .outputFields([
    {
      privateChat: fields.collection.privateChat,
    },
  ])
  .build();

const getAllPrivateChats = privateChatRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getAllPrivateChats")
  .statusCode(200)
  .outputFields([
    {
      privateChats: fields.statics.array(fields.collection.privateChat),
    },
  ])
  .build();

const sendPrivateMessage = privateChatRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/sendPrivateMessage")
  .statusCode(200)
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
