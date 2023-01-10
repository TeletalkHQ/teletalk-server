const { expect } = require("chai");

const { randomMaker } = require("$/classes/RandomMaker");

const { helpers } = require("$/helpers");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

describe("send message success tests", () => {
  it("should start new chat and send message", async () => {
    const { token: currentUserToken, user: currentUser } =
      await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const requester = requesters
      .sendPrivateMessage()
      .setToken(currentUserToken);

    const messagesLength = 10;
    for (let i = 0; i < messagesLength; i++) {
      const text = createMessage(i);
      const { body: sendMessageResponse } =
        await requester.sendFullFeaturedRequest({
          participantId: targetUser.userId,
          message: text,
        });

      await testData({
        currentUser,
        sendMessageResponse,
        targetUser,
        text,
      });
    }

    const chat = await findOnePrivateChat(
      currentUser.userId,
      targetUser.userId
    );
    expect(chat.messages.length).to.be.equal(messagesLength);
  });
});

describe("send message fail tests", () => {
  const requester = requesters.sendPrivateMessage();
  helpers.configureFailTestRequester(requester);

  const data = {
    message: randomMaker.string(10),
    participantId: randomMaker.id(),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .checkCurrentUserStatus(data)
    .participantId(data)
    .message(data)
    .targetUserNotExist(data);
});

const createMessage = (index) => `Hello! Im message #${index}`;

const testData = async ({
  currentUser,
  sendMessageResponse,
  targetUser,
  text,
}) => {
  const chat = await findOnePrivateChat(currentUser.userId, targetUser.userId);

  const currentParticipant = chat.participants.find(
    (i) => i.participantId === currentUser.userId
  );
  const targetParticipant = chat.participants.find(
    (i) => i.participantId === targetUser.userId
  );
  const foundMessage = chat.messages.find(
    (m) => m.messageId === sendMessageResponse.newMessage.messageId
  );

  testHelper
    .createSuccessTest()
    .chatId({
      equalValue: sendMessageResponse.chatId,
      testValue: chat.chatId,
    })
    .message({
      equalValue: text,
      testValue: foundMessage.message,
    })
    .message({
      equalValue: text,
      testValue: sendMessageResponse.newMessage.message,
    })
    .messageId({
      equalValue: sendMessageResponse.newMessage.messageId,
      testValue: foundMessage.messageId,
    })
    .userId({
      equalValue: targetUser.userId,
      testValue: targetParticipant.participantId,
    })
    .userId({
      equalValue: currentUser.userId,
      testValue: currentParticipant.participantId,
    })
    .userId({
      equalValue: currentUser.userId,
      testValue: sendMessageResponse.newMessage.sender.senderId,
    });
};

const findOnePrivateChat = async (currentUserId, targetUserId) => {
  return await services
    .findOnePrivateChat()
    .exclude()
    .run({
      "participants.participantId": {
        $all: [currentUserId, targetUserId],
      },
    });
};
