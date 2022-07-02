const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { chatsSuccessTests } = require("$/api/generalTests/chatsTests");
const {
  requesters: { getAllChatsRequest },
} = require("@/variables/others/testVariables");

describe("getAllChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await getAllChatsRequest.sendRequest();

    chatsSuccessTests({ chatsTest: chats });
  });
});

describe("getAllChatsApi failure tests", () => {
  authenticationFailureTests(getAllChatsRequest);
});
