const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { chatsSuccessTests } = require("$/api/generalTests/chatsTests");

const { requesters } = require("$/helpers/requesters");

describe("getAllPrivateChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await requesters.getAllChatsRequest().sendFullFeaturedRequest();

    chatsSuccessTests({ chatsTest: chats });
  });
});

describe("getAllChatsApi failure tests", () => {
  authenticationFailureTests(requesters.getAllChatsRequest());
});
