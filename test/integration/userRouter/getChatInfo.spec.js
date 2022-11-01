const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");
const { requesters } = require("$/functions/helpers/requesters");

describe("getChatInfo success tests", () => {
  it("Should get all user chats array", async () => {
    const {
      body: { chatInfo },
    } = await requesters.getChatInfo().sendFullFeaturedRequest();

    integrationHelpers
      .createSuccessTest()
      .chatInfo({ responseValue: chatInfo });
  });
});

describe("getAllChatsApi failure tests", () => {
  integrationHelpers.createFailTest(requesters.getChatInfo()).authentication();
});
