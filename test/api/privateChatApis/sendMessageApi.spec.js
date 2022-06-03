const { customRequest } = require("@/functions/helpers/CustomRequest");
const { randomMaker } = require("@/functions/helpers/RandomMaker");
const { describer } = require("@/functions/helpers/Describer");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, sendMessageRoute },
} = require("@/variables/routes/privateChatRoutes");

const {
  participantIdFailureTests,
} = require("$/api/generalTests/participantIdTests");
const { privateIdSuccessTests } = require("$/api/generalTests/privateIdTests");
const { chatIdSuccessTests } = require("$/api/generalTests/chatIdTests");
const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const {
  messageSuccessTests,
  messageFailureTests,
} = require("$/api/generalTests/messageTests");

describer.addInitialDescribe(privateChatRouteBaseUrl, sendMessageRoute, "0");

const message = "Hello! Im messages!";

describe("send message success tests", () => {
  it("Should start new chat with selected test users", async () => {
    const { testUser_1 } = describer.state.testUsers;
    const { privateId } = testUser_1;

    const {
      body: {
        chatId,
        newMessage: {
          message: newMessage,
          messageId,
          messageSender: { senderId },
        },
      },
    } = await customRequest.sendRequest({
      participantId: privateId,
      message,
    });

    privateIdSuccessTests(
      {
        privateIdTest: senderId,
      },
      { stringEquality: false }
    );

    chatIdSuccessTests(
      {
        chatIdTest: chatId,
      },
      { stringEquality: false }
    );

    messageIdSuccessTests({ chatIdTest: messageId }, { stringEquality: false });

    messageSuccessTests({ messageMain: message, messageTest: newMessage });
  });
});

describe("send message failure tests", () => {
  participantIdFailureTests({ message });
  messageFailureTests({ participantId: randomMaker.randomId() });
});
