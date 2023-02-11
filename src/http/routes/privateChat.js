const { httpRouteBuilder } = require("@/classes/routeBuilder/HttpRouteBuilder");

const { baseUrls } = require("@/http/routes/baseUrls");
const { fields } = require("@/http/routes/fields");

const { METHODS } = require("@/variables/others/methods");

const privateChatRouteBuilder = httpRouteBuilder(baseUrls.privateChat);

const getPrivateChat = privateChatRouteBuilder
  .create()
  .method(METHODS.POST)
  .url("/getPrivateChat")
  .inputFields({ chatId: fields.single.chatId })
  .outputFields([
    {
      privateChat: fields.statics.object(fields.collection.privateChat),
    },
  ])
  .build();

const getAllPrivateChats = privateChatRouteBuilder
  .create()
  .method(METHODS.GET)
  .url("/getAllPrivateChats")
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

const privateChatRoutes = {
  getAllPrivateChats,
  getPrivateChat,
  sendPrivateMessage,
};

module.exports = {
  privateChatRoutes,
};
