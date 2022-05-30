const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, sendMessageRoute },
} = require("@/variables/routes/privateChatRoutes");

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

describe("send message success tests", () => {
  it("Should start new chat with selected test users", async () => {
    const { testUser_1 } = testUsers;
    const { privateId } = testUser_1;

    const message = "Hello! Im messages!";

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
  });
});
