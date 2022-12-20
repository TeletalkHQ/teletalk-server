const { arrayUtilities } = require("utility-store/src/classes/ArrayUtilities");
const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const {
  integrationHelpers,
} = require("$/tests/integration/helpers/integrationHelpers");

const { requesters } = require("$/utilities/requesters");

const { testVariablesManager } = require("$/classes/TestVariablesManager");

const users = testVariablesManager.getUsers();

//TODO: Use arrayUtilities instead
//TODO: Add tests for total privateChats and total messages
const messages = Array.from({ length: 20 }).map((_, index) => {
  return `Hello! Im message #${index}`;
});

describe("send message success tests", () => {
  it("Should start new chat with selected test users and send message", async () => {
    const { userId } = users.sendMessageSuccessful;

    for (const message of messages) {
      const {
        body: {
          chatId,
          newMessage: {
            message: newMessage,
            messageId,
            sender: { senderId },
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
          requestValue: message,
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
