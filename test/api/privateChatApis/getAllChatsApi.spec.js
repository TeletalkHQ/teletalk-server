const { customRequest } = require("@/functions/helpers/CustomRequest");
const { describer } = require("@/functions/helpers/Describer");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, getAllChatsRoute },
} = require("@/variables/routes/privateChatRoutes");

const {
  authenticationFailureTests,
} = require("$/api/generalTests/authenticationTests");
const { chatsSuccessTests } = require("$/api/generalTests/chatsTests");

describer.addInitialDescribe(privateChatRouteBaseUrl, getAllChatsRoute, "0");

describe("getAllChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await customRequest.sendRequest();

    chatsSuccessTests({ chatsTest: chats });
  });
});

describe("getAllChatsApi failure tests", () => {
  authenticationFailureTests();
});
