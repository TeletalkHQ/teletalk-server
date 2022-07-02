const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const { senderIdSuccessTests } = require("$/api/generalTests/senderIdTests");
const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { chatIdFailureTests } = require("$/api/generalTests/chatIdTests");
const {
  requesters: {
    getPrivateChatMessagesRequest,
    sendMessageRequest,
    getAllChatsRequest,
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
      await sendMessageRequest.sendRequest({
        participantId: getPrivateChatMessagesTestUser.privateId,
        message,
      });
    }

    //? Now get added chats from user data =>
    const {
      body: { chats },
    } = await getAllChatsRequest.sendRequest();

    const { chatId } = chats.at(-1);

    const {
      body: { messages },
    } = await getPrivateChatMessagesRequest.sendRequest({ chatId });

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
  authenticationFailureTests(getPrivateChatMessagesRequest);
  chatIdFailureTests(getPrivateChatMessagesRequest);
});
