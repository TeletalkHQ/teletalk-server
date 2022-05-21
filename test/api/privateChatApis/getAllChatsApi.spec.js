const { customRequest } = require("@/functions/helpers/CustomRequest");
const { getTestUsersFromState } = require("@/functions/utilities/testUtils");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, getAllChatsRoute },
} = require("@/variables/routes/privateChatRoutes");

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
    const response = await customRequest.sendRequest();

    logger.log(response.body);
  });
});
