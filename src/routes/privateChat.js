const { routeBuilder } = require("@/classes/RouteBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { baseUrls } = require("@/routes/baseUrls");

const {
  inputOutputFields: {
    chatId,
    chats,
    message,
    messageId,
    messages,
    messageSender,
    newMessage,
    participantId,
    senderId,
  },
} = require("@/variables/others/inputOutputFields");

const privateChatRouteBuilder = routeBuilder(baseUrls.privateChat);

const getAllChats = privateChatRouteBuilder
  .create()
  .method("get")
  .url("/privateChat/getAllPrivateChats")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Start new chat")
  .inputFields([{}])
  .outputFields([
    {
      [chats]: [
        {
          chatId,
        },
      ],
    },
  ])
  .build();

const chatsLastMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/privateChat/privateChatsLastMessages")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Get chats last message")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const getPrivateChatMessages = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/privateChat/getPrivateMessages")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for get all messages")
  .inputFields([{ chatId }])
  .outputFields([
    {
      [messages]: [
        {
          message,
          messageId,
          [messageSender]: {
            senderId,
          },
        },
      ],
    },
  ])
  .build();

const sendMessage = privateChatRouteBuilder
  .create()
  .method("post")
  .url("/privateChat/sendPrivateMessage")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for send private messages")
  .inputFields([
    {
      message,
      participantId,
    },
  ])
  .outputFields([
    {
      chatId,
      newMessage,
    },
  ])
  .build();

const routes = {
  chatsLastMessage,
  getAllChats,
  getPrivateChatMessages,
  sendMessage,
};

const privateChatRoutes = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  privateChatRoutes,
};
