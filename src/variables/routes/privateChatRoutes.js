const { routeBuilder } = require("@/functions/helpers/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");
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
} = require("@/variables/others/initialOptions");

const privateChatRouteBaseUrl = routeBuilder
  .create()
  .url("/chat")
  .version("1.0.0")
  .description("privateChatRouteBaseUrl description")
  .build();

const getAllChatsRoute = routeBuilder
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

const chatsLastMessageRoute = routeBuilder
  .create()
  .method("post")
  .url("/privateChat/privateChatsLastMessages")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Get chats last message")
  .inputFields([])
  .outputFields([])
  .build();

const getPrivateChatMessagesRoute = routeBuilder
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
          [messageSender]: {
            senderId,
          },
          messageId,
          message,
        },
      ],
    },
  ])
  .build();

//DEPRECATED startChatRoute
const startChatRoute = routeBuilder
  .create()
  .method("post")
  .url("/privateChat/startNewPrivateChat")
  .statusCode(200)
  .version("1.0.0")
  .description("Use for Start new chat")
  .inputFields([{}])
  .outputFields([{}])
  .build();

const sendMessageRoute = routeBuilder
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
  privateChatRouteBaseUrl,
  chatsLastMessageRoute,
  getAllChatsRoute,
  getPrivateChatMessagesRoute,
  sendMessageRoute,
  startChatRoute,
};

const privateChatRoutes = {
  version: versionCalculator(extractVersions(routes)),
  ...routes,
};

module.exports = {
  privateChatRoutes,
};
