const {
  integrationHelpers,
} = require("$/helpers/integrationHelpers/integrationHelpers");
const { requesters } = require("$/helpers/requesters");

describe("getAllPrivateChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await requesters.getAllChatsRequest().sendFullFeaturedRequest();

    integrationHelpers.createSuccessTest().chats({ chatsTest: chats });
  });
});

describe("getAllChatsApi failure tests", () => {
  integrationHelpers
    .createFailTest(requesters.getAllChatsRequest())
    .authentication();
});
