const { customRequest } = require("@/classes/CustomRequest");
const { describer } = require("@/classes/Describer");
const { stateManager } = require("@/functions/tools/StateManager");

const {
  privateChatRoutes: {
    getAllChatsRoute,
    getPrivateChatMessagesRoute,
    privateChatRouteBaseUrl,
    sendMessageRoute,
  },
} = require("@/variables/routes/privateChatRoutes");

const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const { senderIdSuccessTests } = require("$/api/generalTests/senderIdTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { chatIdFailureTests } = require("$/api/generalTests/chatIdTests");

describer.addInitialDescribe(
  privateChatRouteBaseUrl,
  getPrivateChatMessagesRoute,
  "0"
);

const message = "Hello! Im messages!";

describe("get messages success tests", () => {
  it("Should get messages for testUser_0", async () => {
    const { testUser_1 } = stateManager.state.testUsers;

    //? First start a chat and send some messages to testUser_1 =>
    // eslint-disable-next-line no-unused-vars
    for (const _ of Array.from({ length: 10 })) {
      await customRequest.sendRequest(
        { participantId: testUser_1.privateId, message },
        undefined,
        undefined,
        undefined,
        sendMessageRoute
      );
    }

    //? Now get added chats from user data =>
    const {
      body: { chats },
    } = await customRequest.sendRequest(
      undefined,
      undefined,
      undefined,
      privateChatRouteBaseUrl,
      getAllChatsRoute
    );

    const { chatId } = chats.at(-1);

    const {
      body: { messages },
    } = await customRequest.sendRequest({ chatId });

    const {
      messageId,
      messageSender: { senderId },
    } = messages.at(-1);

    messageIdSuccessTests(
      { messageIdTest: messageId },
      { stringEquality: false }
    );
    senderIdSuccessTests(
      { participantIdTest: senderId },
      { stringEquality: false }
    );
  });
});

describe("getMessagesApi failure tests", () => {
  authenticationFailureTests();
  chatIdFailureTests();
});
