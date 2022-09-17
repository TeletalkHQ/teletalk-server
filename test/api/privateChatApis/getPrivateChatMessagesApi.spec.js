const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const { senderIdSuccessTests } = require("$/api/generalTests/senderIdTests");
const { chatIdFailureTests } = require("$/api/generalTests/chatIdTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");

const {
  requesters: {
    getAllChatsRequest,
    getPrivateChatMessagesRequest,
    sendMessageRequest,
  },
  testVariables: {
    testUsers: { getPrivateChatMessagesTestUser },
  },
} = require("@/variables/others/testVariables");

describe("get messages success tests", () => {
  it("Should get messages for testUser_0", async () => {
    const message = "Hello! Im messages!";

    //? First start a chat and send some messages to testUser_1 =>
    // eslint-disable-next-line no-unused-vars
    for (const _ of Array.from({ length: 10 })) {
      await sendMessageRequest().sendFullFeaturedRequest({
        message,
        participantId: getPrivateChatMessagesTestUser.privateId,
      });
    }

    //? Now get added chats from user data =>
    const {
      body: { chats },
    } = await getAllChatsRequest().sendFullFeaturedRequest();

    const { chatId } = chats.at(-1);

    const {
      body: { messages },
    } = await getPrivateChatMessagesRequest().sendFullFeaturedRequest({
      chatId,
    });

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
  authenticationFailureTests(getPrivateChatMessagesRequest());
  chatIdFailureTests(getPrivateChatMessagesRequest());
});
