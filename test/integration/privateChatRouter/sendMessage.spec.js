const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");

const message = "Hello! Im messages!";

describe("send message success tests", () => {
  it("Should start new chat with selected test users and send message", async () => {
    const { userId } = testVariables.users.sendMessageSuccessful;

    const {
      body: {
        chatId,
        newMessage: {
          message: newMessage,
          messageId,
          messageSender: { senderId },
        },
      },
    } = await requesters.sendMessage().sendFullFeaturedRequest({
      participantId: userId,
      message,
    });

    integrationHelpers
      .createSuccessTest()
      .userId(
        {
          responseValue: senderId,
        },
        { stringEquality: false }
      )
      .chatId(
        {
          responseValue: chatId,
        },
        { stringEquality: false }
      )
      .messageId({ responseValue: messageId }, { stringEquality: false })
      .message({ clientValue: message, responseValue: newMessage });
  });
});

describe("send message failure tests", () => {
  integrationHelpers
    .createFailTest(requesters.sendMessage())
    .authentication()
    .participantId({ message })
    .message({
      participantId: randomMaker.randomId(),
    });
});
