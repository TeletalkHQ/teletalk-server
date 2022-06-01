const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, sendMessageRoute },
} = require("@/variables/routes/privateChatRoutes");

const {
  participantIdFailureTests,
} = require("$/api/generalTests/participantIdTests");
const { privateIdSuccessTests } = require("$/api/generalTests/privateIdTests");
const { chatIdSuccessTests } = require("$/api/generalTests/chatIdTests");
const { messageIdSuccessTests } = require("$/api/generalTests/messageIdTests");
const { messageSuccessTests } = require("$/api/generalTests/messageTests");

let testUsers = {};

describe("", () => {
  it("should fill testUsers object and set customRequest properties", async () => {
    customRequest.setRequestRequirements(
      privateChatRouteBaseUrl,
      sendMessageRoute
    );

    testUsers = await getTestUsersFromState();

    customRequest.setMainTokenByUserObject(testUsers.testUser_0);
  });
});

const message = "Hello! Im messages!";

describe("send message success tests", () => {
  it("Should start new chat with selected test users", async () => {
    const { testUser_1 } = testUsers;
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
});
