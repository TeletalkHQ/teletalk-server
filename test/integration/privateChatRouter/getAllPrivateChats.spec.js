const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { requesters } = require("$/functions/helpers/requesters");

describe("getAllPrivateChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await requesters.getAllChats().sendFullFeaturedRequest();

    integrationHelpers.createSuccessTest().chats({ responseValue: chats });
  });
});

describe("getAllChatsApi failure tests", () => {
  integrationHelpers.createFailTest(requesters.getAllChats()).authentication();
});
