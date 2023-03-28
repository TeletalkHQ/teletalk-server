import { expect } from "chai";
import { Socket } from "socket.io-client";

import { randomMaker } from "$/classes/RandomMaker";

import { services } from "@/services";

import { testHelper } from "$/helpers/testHelper";

import { Message, Participant, PrivateChatMongo, UserMongo } from "@/types";

import { utilities } from "$/utilities";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("get messages success tests", () => {
  it("Should get messages", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const message = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      const {
        data: { chatId },
      } = await utilities.requesters
        .sendPrivateMessage(socket)
        .sendFullFeaturedRequest({
          message,
          participantId: targetUser.userId,
        });

      await testPrivateChat(chatId, socket, currentUser, targetUser);
    }
  });
});

// describe("getMessagesApi fail tests", () => {
//   const requester = utilities.requesters.getPrivateChat();
//   helpers.configureFailTestRequester(requester);

//   const data = {
//     chatId: randomMaker.string(privateChatModels.chatId.maxlength.value),
//   };

//   testHelper
//     .createFailTest(requester)
//     .authentication()
//     .checkCurrentUserStatus(data)
//     .chatId(data);
// });

const testPrivateChat = async (
  chatId: string,
  socket: Socket,
  currentUser: UserMongo,
  targetUser: UserMongo
) => {
  const { privateChat } = await getPrivateChat(socket, chatId);
  expect(privateChat).to.be.an(FIELD_TYPE.OBJECT);
  expect(privateChat.participants).to.be.an(FIELD_TYPE.ARRAY);
  expect(privateChat.participants).to.be.an(FIELD_TYPE.ARRAY).and.length(2);

  const privateChatFromDb = await findStoredPrivateChat(
    currentUser.userId,
    targetUser.userId
  );
  expect(privateChatFromDb).to.be.an(FIELD_TYPE.OBJECT);
  expect(privateChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY);
  expect(privateChatFromDb.participants)
    .to.be.an(FIELD_TYPE.ARRAY)
    .and.length(2);

  tesChatId(chatId, privateChat, privateChatFromDb);
  testMessages(privateChat, privateChatFromDb);
  testParticipants(
    currentUser.userId,
    privateChat,
    privateChatFromDb,
    targetUser.userId
  );
};

const getPrivateChat = async (socket: Socket, chatId: string) => {
  const { data } = await utilities.requesters
    .getPrivateChat(socket)
    .sendFullFeaturedRequest({ chatId });
  return data;
};

const findStoredPrivateChat = async (
  currentUserId: string,
  targetUserId: string
) => {
  return (await services.findOnePrivateChat({
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  })) as PrivateChatMongo;
};

const tesChatId = (
  chatId: string,
  privateChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo
) => {
  testHelper.createSuccessTest().chatId({
    equalValue: chatId,
    testValue: privateChatFromDb.chatId,
  });
  testHelper.createSuccessTest().chatId({
    equalValue: chatId,
    testValue: privateChat.chatId,
  });
};

const testMessages = (
  foundChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo
) => {
  for (const item of foundChat.messages) {
    const {
      messageId,
      messageText,
      sender: { senderId },
    } = item;
    const foundMessageFromDb = privateChatFromDb.messages.find(
      (i) => i.messageId === messageId
    ) as Message;

    testHelper
      .createSuccessTest()
      .message({
        equalValue: foundMessageFromDb.messageText,
        testValue: messageText,
      })
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

const testParticipants = (
  currentUserId: string,
  foundChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo,
  targetUserId: string
) => {
  const {
    currentParticipantFromApi,
    currentParticipantFromDb,
    targetParticipantFromApi,
    targetParticipantFromDb,
  } = findAllParticipants(
    currentUserId,
    foundChat,
    privateChatFromDb,
    targetUserId
  );

  testHelper
    .createSuccessTest()
    .userId({
      equalValue: currentUserId,
      testValue: currentParticipantFromDb.participantId,
    })
    .userId({
      equalValue: targetUserId,
      testValue: targetParticipantFromDb.participantId,
    })
    .userId({
      equalValue: currentUserId,
      testValue: currentParticipantFromApi.participantId,
    })
    .userId({
      equalValue: targetUserId,
      testValue: targetParticipantFromApi.participantId,
    });
};

const findAllParticipants = (
  currentUserId: string,
  foundChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo,
  targetUserId: string
) => {
  return {
    currentParticipantFromApi: findParticipant(foundChat, currentUserId),
    currentParticipantFromDb: findParticipant(privateChatFromDb, currentUserId),
    targetParticipantFromApi: findParticipant(foundChat, targetUserId),
    targetParticipantFromDb: findParticipant(privateChatFromDb, targetUserId),
  };
};
const findParticipant = (
  privateChat: PrivateChatMongo,
  participantId: string
) =>
  privateChat.participants.find(
    (i) => i.participantId === participantId
  ) as Participant;
