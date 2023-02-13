const {
  socketRouteBuilder,
} = require("@/classes/routeBuilder/SocketRouteBuilder");

const { fields } = require("@/variables/others/fields");

const { METHODS } = require("@/variables/others/methods");

const {
  privateChatHandlers,
} = require("@/websocket/events/privateChat/handlers");

const builder = socketRouteBuilder();

const joinRoom = builder
  .create()
  .name("joinRoom")
  .handler(privateChatHandlers.joinRoom)
  .method(METHODS.ONCE)
  .build();

const getPrivateChat = builder
  .create()
  .handler(privateChatHandlers.getPrivateChats)
  .name("getPrivateChat")
  .inputFields({ chatId: fields.single.chatId })
  .outputFields([
    {
      privateChat: fields.statics.object(fields.collection.privateChat),
    },
  ])
  .build();

const getPrivateChats = builder
  .create()
  .handler(privateChatHandlers.getPrivateChats)
  .name("getPrivateChats")
  .outputFields([
    {
      privateChats: fields.statics.array(fields.collection.privateChat),
    },
  ])
  .build();

const sendPrivateMessage = builder
  .create()
  .handler(privateChatHandlers.sendPrivateMessage)
  .name("sendPrivateMessage")
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
  getPrivateChat,
  getPrivateChats,
  joinRoom,
  sendPrivateMessage,
};

module.exports = {
  privateChatRoutes,
};
