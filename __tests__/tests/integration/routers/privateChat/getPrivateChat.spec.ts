import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { chatModels } from "@/models/native/chat";

import { services } from "@/services";

import { testHelper } from "$/tests/integration/helpers/testHelper";

import { requesters } from "$/utilities";

import { FIELD_TYPE } from "@/variables/others/fieldType";

describe("get messages success tests", () => {
  it("Should get messages", async () => {
    const { user: currentUser, token: currentUserToken } =
      await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const message = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      const {
        body: { chatId },
      } = await requesters
        .sendPrivateMessage()
        .setToken(currentUserToken)
        .sendFullFeaturedRequest({
          message,
          participantId: targetUser.userId,
        });

      await testPrivateChat({
        chatId,
        currentUser,
        currentUserToken,
        targetUser,
      });
    }
  });
});

describe("getMessagesApi fail tests", () => {
  const requester = requesters.getPrivateChat();
  helpers.configureFailTestRequester(requester);

  const data = {
    chatId: randomMaker.string(chatModels.chatId.maxlength.value),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .checkCurrentUserStatus(data)
    .chatId(data);
});

const testPrivateChat = async ({
  chatId,
  currentUser,
  currentUserToken,
  targetUser,
}) => {
  const { privateChat } = await getPrivateChat(currentUserToken, chatId);
  expect(privateChat).toBeInstanceOf(FIELD_TYPE.OBJECT);
  expect(privateChat.participants).toBeInstanceOf(FIELD_TYPE.ARRAY);
  expect(privateChat.participants).to.be.an(FIELD_TYPE.ARRAY).toHaveLength(2);

  const privateChatFromDb = await findStoredPrivateChat(
    currentUser.userId,
    targetUser.userId
  );
  expect(privateChatFromDb).toBeInstanceOf(FIELD_TYPE.OBJECT);
  expect(privateChatFromDb.participants).toBeInstanceOf(FIELD_TYPE.ARRAY);
  expect(privateChatFromDb.participants)
    .to.be.an(FIELD_TYPE.ARRAY)
    .toHaveLength(2);

  tesChatId(chatId, privateChat, privateChatFromDb);
  testMessages(privateChat, privateChatFromDb);
  testParticipants({
    currentUser,
    foundChat: privateChat,
    privateChatFromDb,
    targetUser,
  });
};

const getPrivateChat = async (token, chatId) => {
  const { body } = await requesters
    .getPrivateChat()
    .setToken(token)
    .sendFullFeaturedRequest({ chatId });
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

const tesChatId = (chatId, privateChat, privateChatFromDb) => {
  testHelper.createSuccessTest().chatId({
    equalValue: chatId,
    testValue: privateChatFromDb.chatId,
  });
  testHelper.createSuccessTest().chatId({
    equalValue: chatId,
    testValue: privateChat.chatId,
  });
};

const testMessages = (foundChat, privateChatFromDb) => {
  for (const item of foundChat.messages) {
    const {
      message,
      messageId,
      sender: { senderId },
    } = item;
    const foundMessageFromDb = privateChatFromDb.messages.find(
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
  privateChatFromDb,
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
    privateChatFromDb,
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
  privateChatFromDb,
  targetUser,
}) => {
  return {
    currentParticipantFromApi: findParticipant(foundChat, currentUser.userId),
    currentParticipantFromDb: findParticipant(
      privateChatFromDb,
      currentUser.userId
    ),
    targetParticipantFromApi: findParticipant(foundChat, targetUser.userId),
    targetParticipantFromDb: findParticipant(
      privateChatFromDb,
      targetUser.userId
    ),
  };
};
const findParticipant = (chat, participantId) =>
  chat.participants.find((i) => i.participantId === participantId);
