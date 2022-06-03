const { customRequest } = require("@/functions/helpers/CustomRequest");
const { describer } = require("@/functions/helpers/Describer");

const {
  privateChatRoutes: { privateChatRouteBaseUrl, getAllChatsRoute },
} = require("@/variables/routes/privateChatRoutes");
const { chatsSuccessTests } = require("../generalTests/chatsTests");

describer.addInitialDescribe(privateChatRouteBaseUrl, getAllChatsRoute, "0");

describe("getAllChats success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chats },
    } = await customRequest.sendRequest();

    chatsSuccessTests({ chatsTest: chats });
  });
});
