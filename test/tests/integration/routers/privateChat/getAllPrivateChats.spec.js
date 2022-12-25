const { arrayUtilities } = require("utility-store/src/classes/ArrayUtilities");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

const { requesters } = require("$/utilities/requesters");
const { testHelper } = require("$/tests/integration/helpers/testHelper");

const users = testVariablesManager.getUsers();

describe("get messages success tests", () => {
  it("Should get messages for testUser_0", async () => {
    const message = "Hello! Im messages!";

    //? First start a chat and send some messages to testUser_1 =>
    // eslint-disable-next-line no-unused-vars
    for (const _ of Array.from({ length: 10 })) {
      await requesters.sendPrivateMessage().sendFullFeaturedRequest({
        message,
        participantId: users.getAllPrivateChats.userId,
      });
    }

    //? Now get added chats from user data =>
    const {
      body: { privateChats },
    } = await requesters.getAllPrivateChats().sendFullFeaturedRequest();

    for (const chat of privateChats) {
      const { messages } = chat;

      const {
        messageId,
        sender: { senderId },
      } = arrayUtilities.lastItem(messages);

      testHelper
        .createSuccessTest()
        .messageId({ responseValue: messageId }, { stringEquality: false })
        .participantId({ responseValue: senderId }, { stringEquality: false });
    }
  });
});

describe("getMessagesApi failure tests", () => {
  testHelper
    .createFailTest(requesters.getAllPrivateChats())
    .authentication()
    .checkCurrentUserStatus();
});
