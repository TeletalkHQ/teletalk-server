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

    customRequest.setMainTokenFromUserObject(testUsers.testUser_0);
  });
});

describe(() => {
  it("Should start new chat with selected test users", () => {});
});
