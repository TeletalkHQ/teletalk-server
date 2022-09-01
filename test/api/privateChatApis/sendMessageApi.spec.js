const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  requesters: { sendMessageRequest },
  testVariables: {
    testUsers: { sendMessageSuccessfulTestUser },
  },
} = require("@/variables/others/testVariables");
const { generalTest } = require("@/classes/GeneralTest");

const message = "Hello! Im messages!";

describe("send message success tests", () => {
  it("Should start new chat with selected test users and send message", async () => {
    const { privateId } = sendMessageSuccessfulTestUser;

    const {
      body: {
        chatId,
        newMessage: {
          message: newMessage,
          messageId,
          messageSender: { senderId },
        },
      },
    } = await sendMessageRequest().sendFullFeaturedRequest({
      participantId: privateId,
      message,
    });

    generalTest
      .createSuccessTest()
      .privateId(
        {
          privateIdTest: senderId,
        },
        { stringEquality: false }
      )
      .chatId(
        {
          chatIdTest: chatId,
        },
        { stringEquality: false }
      )
      .messageId({ messageIdTest: messageId }, { stringEquality: false })
      .message({ messageMain: message, messageTest: newMessage });
  });
});

describe("send message failure tests", () => {
  generalTest
    .createFailTest(sendMessageRequest())
    .authentication()
    .participantId({ message })
    .message({
      participantId: randomMaker.randomId(),
    });
});
