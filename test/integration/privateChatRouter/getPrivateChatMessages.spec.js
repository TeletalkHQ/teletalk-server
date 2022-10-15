const { requesters } = require("$/functions/helpers/requesters");
const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { testVariables } = require("$/variables/testVariables");

describe("get messages success tests", () => {
  it("Should get messages for testUser_0", async () => {
    const message = "Hello! Im messages!";

    //? First start a chat and send some messages to testUser_1 =>
    // eslint-disable-next-line no-unused-vars
    for (const _ of Array.from({ length: 10 })) {
      await requesters.sendMessage().sendFullFeaturedRequest({
        message,
        participantId: testVariables.users.getPrivateChatMessages.privateId,
      });
    }

    //? Now get added chats from user data =>
    const {
      body: { chats },
    } = await requesters.getAllChats().sendFullFeaturedRequest();

    const chat = chats.at(-1);

    const {
      body: { messages },
    } = await requesters.getPrivateChatMessages().sendFullFeaturedRequest({
      chatId: chat.chatId,
    });

    const {
      messageId,
      messageSender: { senderId },
    } = messages.at(-1);

    integrationHelpers
      .createSuccessTest()
      .messageId({ responseValue: messageId }, { stringEquality: false })
      .participantId({ responseValue: senderId }, { stringEquality: false });
  });
});

describe("getMessagesApi failure tests", () => {
  integrationHelpers
    .createFailTest(requesters.getPrivateChatMessages())
    .authentication()
    .chatId();
});
