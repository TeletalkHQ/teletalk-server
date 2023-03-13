import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

import { fields } from "@/variables/others/fields";

import { privateChatHandlers } from "@/websocket/events/privateChat/handlers";

const builder = socketRouteBuilder();

const getChatInfo = builder
  .create()
  .handler(privateChatHandlers.getChatInfo)
  .name("getChatInfo")
  .inputFields({ chatId: fields.single.chatId })
  .outputFields({
    chatInfo: fields.statics.object({
      chatId: fields.single.chatId,
      createdAt: fields.single.createdAt,
      participants: fields.collection.participants,
    }),
  })
  .build();

// const getPrivateChat = builder
//   .create()
//   .handler(privateChatHandlers.getPrivateChat)
//   .name("getPrivateChat")
//   .inputFields({ chatId: fields.single.chatId })
//   .outputFields({
//     privateChat: fields.statics.object(fields.collection.privateChat),
//   })
//   .build();

const getPrivateChats = builder
  .create()
  .handler(privateChatHandlers.getPrivateChats)
  .name("getPrivateChats")
  .outputFields({
    privateChats: fields.statics.array(fields.collection.privateChat),
  })
  .build();

const joinRoom = builder
  .create()
  .name("joinRoom")
  .handler(privateChatHandlers.joinRoom)
  .method("once")
  .build();

const sendPrivateMessage = builder
  .create()
  .handler(privateChatHandlers.sendPrivateMessage)
  .name("sendPrivateMessage")
  .inputFields({
    message: fields.single.message,
    participantId: fields.single.participantId,
  })
  .outputFields({
    chatId: fields.single.chatId,
    newMessage: fields.statics.object(fields.collection.messageItem),
  })
  .build();

const privateChatRoutes = {
  getChatInfo,
  // getPrivateChat,
  getPrivateChats,
  joinRoom,
  sendPrivateMessage,
};

export { privateChatRoutes };
