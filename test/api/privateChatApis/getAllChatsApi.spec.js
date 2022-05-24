const { customRequest } = require("@/functions/helpers/CustomRequest");
const {
  getTestUsersFromState,
} = require("@/functions/testUtilities/testUtils");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, getAllChatsRoute },
} = require("@/variables/routes/privateChatRoutes");
const { chatsSuccessTests } = require("../generalTests/chatsTests");

let testUsers = {};

describe("", () => {
  it("should fill testUsers object and set customRequest properties", async () => {
    customRequest.setRequestRequirements(
      privateChatRouteBaseUrl,
      getAllChatsRoute
    );

    testUsers = await getTestUsersFromState();

    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe("getAllChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await customRequest.sendRequest();

    chatsSuccessTests({ chatsTest: chats });
  });
});
