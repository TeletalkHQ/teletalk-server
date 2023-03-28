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
    const { user: currentUser, socket: currentUserSocket } =
      await randomMaker.user();
    const { user: targetUser, socket: targetUserSocket } =
      await randomMaker.user();

    await testEmptinessOfPrivateChats(currentUserSocket);
    await testEmptinessOfPrivateChats(targetUserSocket);

    const message = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      await utilities.requesters
        .sendPrivateMessage(currentUserSocket)
        .sendFullFeaturedRequest({
          message,
          participantId: targetUser.userId,
        });

      await utilities.requesters
        .sendPrivateMessage(targetUserSocket)
        .sendFullFeaturedRequest({
          message,
          participantId: currentUser.userId,
        });

      await testPrivateChats(currentUser, currentUserSocket, targetUser);
    }
  });
});

// describe("getMessagesApi fail tests", () => {
//   testHelper
//     .createFailTest(utilities.requesters.getAllPrivateChats())
//     .authentication()
//     .checkCurrentUserStatus();
// });

const testEmptinessOfPrivateChats = async (socket: Socket) => {
  const requester = utilities.requesters.getPrivateChats(socket);
  const {
    data: { privateChats },
  } = await requester.sendFullFeaturedRequest();

  expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);
  expect(privateChats).to.be.empty;
};

const testPrivateChats = async (
  currentUser: UserMongo,
  currentUserSocket: Socket,
  targetUser: UserMongo
) => {
  const { privateChats } = await getAllPrivateChats(currentUserSocket);
  expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);

  const foundChatFromDb = (await findStoredPrivateChat(
    currentUser.userId,
    targetUser.userId
  )) as PrivateChatMongo;

  testFoundChatFromDb(foundChatFromDb);

  const foundChat = (privateChats as PrivateChatMongo[]).find(
    (i) => i.chatId === (foundChatFromDb as PrivateChatMongo).chatId
  ) as PrivateChatMongo;

  testOnePrivateChat({
    currentUserId: currentUser.userId,
    foundChat,
    foundChatFromDb,
    targetUserId: targetUser.userId,
  });
};

const getAllPrivateChats = async (socket: Socket) => {
  const { data } = await utilities.requesters
    .getPrivateChats(socket)
    .sendFullFeaturedRequest();
  return data;
};

const findStoredPrivateChat = async (
  currentUserId: string,
  targetUserId: string
) => {
  return await services.findOnePrivateChat({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};

const testFoundChatFromDb = (foundChatFromDb: PrivateChatMongo) => {
  expect(foundChatFromDb).to.be.an(FIELD_TYPE.OBJECT);
  expect(foundChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY);
  expect(foundChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY).and.length(2);
};

const testOnePrivateChat = (data: {
  currentUserId: string;
  foundChat: PrivateChatMongo;
  foundChatFromDb: PrivateChatMongo;
  targetUserId: string;
}) => {
  expect(data.foundChat).to.be.an(FIELD_TYPE.OBJECT);
  expect(data.foundChat.participants).to.be.an(FIELD_TYPE.ARRAY).and.length(2);

  tesChatId(data.foundChat, data.foundChatFromDb);
  testMessages(data.foundChat, data.foundChatFromDb);
  testParticipants(data);
};

const tesChatId = (
  foundChat: PrivateChatMongo,
  foundChatFromDb: PrivateChatMongo
) => {
  testHelper.createSuccessTest().chatId({
    equalValue: foundChat.chatId,
    testValue: foundChatFromDb.chatId,
  });
};

const testMessages = (
  foundChat: PrivateChatMongo,
  foundChatFromDb: PrivateChatMongo
) => {
  for (const item of foundChat.messages) {
    const {
      messageText,
      messageId,
      sender: { senderId },
    } = item;
    const foundMessageFromDb = foundChatFromDb.messages.find(
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

const testParticipants = (data: {
  currentUserId: string;
  foundChat: PrivateChatMongo;
  foundChatFromDb: PrivateChatMongo;
  targetUserId: string;
}) => {
  const {
    currentParticipantFromApi,
    currentParticipantFromDb,
    targetParticipantFromApi,
    targetParticipantFromDb,
  } = findAllParticipants({
    currentUserId: data.currentUserId,
    foundChat: data.foundChat,
    foundChatFromDb: data.foundChatFromDb,
    targetUserId: data.targetUserId,
  });

  testHelper
    .createSuccessTest()
    .userId({
      equalValue: data.currentUserId,
      testValue: currentParticipantFromDb.participantId,
    })
    .userId({
      equalValue: data.targetUserId,
      testValue: targetParticipantFromDb.participantId,
    })
    .userId({
      equalValue: data.currentUserId,
      testValue: currentParticipantFromApi.participantId,
    })
    .userId({
      equalValue: data.targetUserId,
      testValue: targetParticipantFromApi.participantId,
    });
};

const findAllParticipants = (data: {
  currentUserId: string;
  foundChat: PrivateChatMongo;
  foundChatFromDb: PrivateChatMongo;
  targetUserId: string;
}) => {
  return {
    currentParticipantFromApi: findParticipant(
      data.foundChat,
      data.currentUserId
    ),
    currentParticipantFromDb: findParticipant(
      data.foundChatFromDb,
      data.currentUserId
    ),
    targetParticipantFromApi: findParticipant(
      data.foundChat,
      data.targetUserId
    ),
    targetParticipantFromDb: findParticipant(
      data.foundChatFromDb,
      data.targetUserId
    ),
  };
};
const findParticipant = (chat: PrivateChatMongo, participantId: string) =>
  chat.participants.find(
    (i) => i.participantId === participantId
  ) as Participant;