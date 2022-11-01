const { arrayUtilities } = require("utility-store/src/classes/ArrayUtilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  integrationHelpers,
} = require("$/functions/helpers/integrationHelpers/integrationHelpers");

const { requesters } = require("$/functions/helpers/requesters");

const { testVariables } = require("$/variables/testVariables");

//TODO: Add multiple message and test
//TODO: Use arrayUtilities instead
const messages = Array.from({ length: 20 }).map((_, index) => {
  return `Hello! Im message #${index}`;
});

describe("send message success tests", () => {
  it("Should start new chat with selected test users and send message", async () => {
    const { userId } = testVariables.users.sendMessageSuccessful;

    for (const message of messages) {
      const {
        body: {
          chatId,
          newMessage: {
            message: newMessage,
            messageId,
            messageSender: { senderId },
          },
        },
      } = await requesters.sendPrivateMessage().sendFullFeaturedRequest({
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
        .messageId(
          {
            responseValue: messageId,
          },
          {
            stringEquality: false,
          }
        )
        .message({
          clientValue: message,
          responseValue: newMessage,
        });
    }
  });
});

describe("send message failure tests", () => {
  integrationHelpers
    .createFailTest(requesters.sendPrivateMessage())
    .authentication()
    .participantId({ message: arrayUtilities.arrayLastItem(messages) })
    .message({
      participantId: randomMaker.randomId(),
    });
});
