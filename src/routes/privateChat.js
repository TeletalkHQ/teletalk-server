const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const { ioFieldTypes } = require("@/variables/others/inputOutputFields");

const privateChatRouteBuilder = routeBuilder(baseUrls.privateChat);

const chatsLastMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/privateChatsLastMessages")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Get chats last message")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const getPrivateChatMessages = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/getPrivateMessages")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get all messages")
  .inputFields([{ chatId: ioFieldTypes.chatId }])
  .outputFields([
    {
      messages: [
        {
          message: ioFieldTypes.message,
          messageId: ioFieldTypes.messageId,
          messageSender: {
            senderId: ioFieldTypes.senderId,
          },
        },
      ],
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
  .inputFields([
    {
      message: ioFieldTypes.message,
      participantId: ioFieldTypes.participantId,
    },
  ])
  .outputFields([
    {
      chatId: ioFieldTypes.chatId,
      newMessage: ioFieldTypes.newMessage,
    },
  ])
  .build();

const routes = {
  chatsLastMessage,
  getPrivateChatMessages,
  sendPrivateMessage,
};

const privateChat = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  privateChat,
};
