const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");
const {
  inputOutputFields: { chats },
} = require("@/variables/constants/initialValues/initialValue");

const privateChatRouteBaseUrl = routeGenerator(
  true,
  "/chat",
  true,
  "1.0.0",
  "",
  [{}],
  [{}]
);

const getAllChatsRoute = routeGenerator(
  "get",
  "/privateChat/getAllPrivateChats",
  200,
  "1.0.0",
  "Use for Start new chat",
  [{}],
  [{ chats }]
);

const chatsLastMessageRoute = routeGenerator(
  "post",
  "/privateChat/privateChatsLastMessages",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessagesRoute = routeGenerator(
  "post",
  "/privateChat/getPrivateMessages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChatRoute = routeGenerator(
  "post",
  "/privateChat/startNewPrivateChat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessageRoute = routeGenerator(
  "post",
  "/privateChat/sendPrivateMessage",
  200,
  "1.0.0",
  "Use for send private messages"
);

const routes = {
  privateChatRouteBaseUrl,
  chatsLastMessageRoute,
  getAllChatsRoute,
  getMessagesRoute,
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
