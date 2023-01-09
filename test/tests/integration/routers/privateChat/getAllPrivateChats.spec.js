const { expect } = require("chai");

const { randomMaker } = require("$/classes/RandomMaker");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("get messages success tests", () => {
  it("Should get messages", async () => {
    const { user: currentUser, token: currentUserToken } =
      await randomMaker.user();
    const { user: targetUser, token: targetUserToken } =
      await randomMaker.user();

    await testEmptinessOfPrivateChats(currentUserToken);
    await testEmptinessOfPrivateChats(targetUserToken);

    const message = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      await requesters
        .sendPrivateMessage()
        .setToken(currentUserToken)
        .sendFullFeaturedRequest({
          message,
          participantId: targetUser.userId,
        });

      await requesters
        .sendPrivateMessage()
        .setToken(targetUserToken)
        .sendFullFeaturedRequest({
          message,
          participantId: currentUser.userId,
        });

      await testPrivateChats({
        currentUser,
        currentUserToken,
        targetUser,
      });
    }
  });
});

describe("getMessagesApi fail tests", () => {
  testHelper
    .createFailTest(requesters.getAllPrivateChats())
    .authentication()
    .checkCurrentUserStatus();
});

const testEmptinessOfPrivateChats = async (token) => {
  const requester = requesters.getAllPrivateChats().setToken(token);
  const {
    body: { privateChats },
  } = await requester.sendFullFeaturedRequest();

  expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);
  expect(privateChats).to.be.empty;
};

const testPrivateChats = async ({
  currentUser,
  currentUserToken,
  targetUser,
}) => {
  const { privateChats } = await getAllPrivateChats(currentUserToken);
  expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);

  const foundChatFromDb = await findStoredPrivateChat(
    currentUser.userId,
    targetUser.userId
  );

  testFoundChatFromDb(foundChatFromDb);

  const foundChat = privateChats.find(
    (i) => i.chatId === foundChatFromDb.chatId
  );

  testOnePrivateChat({
    currentUser,
    foundChat,
    foundChatFromDb,
    targetUser,
  });
};

const getAllPrivateChats = async (token) => {
  const { body } = await requesters
    .getAllPrivateChats()
    .setToken(token)
    .sendFullFeaturedRequest();
  return body;
};

const findStoredPrivateChat = async (currentUserId, targetUserId) => {
  return await services
    .findOnePrivateChat()
    .exclude()
    .run({
      "participants.participantId": {
        $all: [currentUserId, targetUserId],
      },
    });
};

const testFoundChatFromDb = (foundChatFromDb) => {
  expect(foundChatFromDb).to.be.an(FIELD_TYPE.OBJECT);
  expect(foundChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY);
  expect(foundChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY).and.length(2);
};

const testOnePrivateChat = ({
  currentUser,
  foundChat,
  foundChatFromDb,
  targetUser,
}) => {
  expect(foundChat).to.be.an(FIELD_TYPE.OBJECT);
  expect(foundChat.participants).to.be.an(FIELD_TYPE.ARRAY).and.length(2);

  tesChatId(foundChat, foundChatFromDb);
  testMessages(foundChat, foundChatFromDb);
  testParticipants({
    currentUser,
    foundChat,
    foundChatFromDb,
    targetUser,
  });
};

const tesChatId = (foundChat, foundChatFromDb) => {
  testHelper.createSuccessTest().chatId({
    equalValue: foundChat.chatId,
    testValue: foundChatFromDb.chatId,
  });
};

const testMessages = (foundChat, foundChatFromDb) => {
  for (const item of foundChat.messages) {
    const {
      message,
      messageId,
      sender: { senderId },
    } = item;
    const foundMessageFromDb = foundChatFromDb.messages.find(
      (i) => i.messageId === messageId
    );

    testHelper
      .createSuccessTest()
      .message({ equalValue: foundMessageFromDb.message, testValue: message })
      .messageId({
        equalValue: foundMessageFromDb.messageId,
        testValue: messageId,
      })
      .userId({
        equalValue: foundMessageFromDb.sender.senderId,
        testValue: senderId,
      });
  }
};

const testParticipants = ({
  currentUser,
  foundChat,
  foundChatFromDb,
  targetUser,
}) => {
  const {
    currentParticipantFromApi,
    currentParticipantFromDb,
    targetParticipantFromApi,
    targetParticipantFromDb,
  } = findAllParticipants({
    currentUser,
    foundChat,
    foundChatFromDb,
    targetUser,
  });

  testHelper
    .createSuccessTest()
    .userId({
      equalValue: currentUser.userId,
      testValue: currentParticipantFromDb.participantId,
    })
    .userId({
      equalValue: targetUser.userId,
      testValue: targetParticipantFromDb.participantId,
    })
    .userId({
      equalValue: currentUser.userId,
      testValue: currentParticipantFromApi.participantId,
    })
    .userId({
      equalValue: targetUser.userId,
      testValue: targetParticipantFromApi.participantId,
    });
};

const findAllParticipants = ({
  currentUser,
  foundChat,
  foundChatFromDb,
  targetUser,
}) => {
  return {
    currentParticipantFromApi: findParticipant(foundChat, currentUser.userId),
    currentParticipantFromDb: findParticipant(
      foundChatFromDb,
      currentUser.userId
    ),
    targetParticipantFromApi: findParticipant(foundChat, targetUser.userId),
    targetParticipantFromDb: findParticipant(
      foundChatFromDb,
      targetUser.userId
    ),
  };
};
const findParticipant = (chat, participantId) =>
  chat.participants.find((i) => i.participantId === participantId);
