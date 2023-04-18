import chai from "chai";
import { Socket } from "socket.io-client";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { Message, Participant, PrivateChatMongo, UserMongo } from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("get messages success tests", () => {
  it("Should get messages", async () => {
    const { user: currentUser, socket: currentUserSocket } =
      await randomMaker.user();
    const { user: targetUser, socket: targetUserSocket } =
      await randomMaker.user();

    await testEmptinessOfPrivateChats(currentUserSocket);
    await testEmptinessOfPrivateChats(targetUserSocket);

    const messageText = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      await helpers.requesters
        .sendPrivateMessage(currentUserSocket)
        .sendFullFeaturedRequest({
          messageText,
          participantId: targetUser.userId,
        });

      await helpers.requesters
        .sendPrivateMessage(targetUserSocket)
        .sendFullFeaturedRequest({
          messageText,
          participantId: currentUser.userId,
        });

      await testPrivateChats(currentUser, currentUserSocket, targetUser);
    }
  });
});

// describe("getMessages fail tests", () => {
//   testHelper
//     .createFailTest(helpers.requesters.getAllPrivateChats())
//     .authentication()
//     .checkCurrentUserStatus();
// });

const testEmptinessOfPrivateChats = async (socket: Socket) => {
  const requester = helpers.requesters.getPrivateChats(socket);
  const {
    data: { privateChats },
  } = await requester.sendFullFeaturedRequest();

  chai.expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);
  chai.expect(privateChats).to.be.empty;
};

const testPrivateChats = async (
  currentUser: UserMongo,
  currentUserSocket: Socket,
  targetUser: UserMongo
) => {
  const { privateChats } = await getAllPrivateChats(currentUserSocket);
  chai.expect(privateChats).to.be.an(FIELD_TYPE.ARRAY);

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
  const { data } = await helpers.requesters
    .getPrivateChats(socket)
    .sendFullFeaturedRequest();
  return data;
};

const findStoredPrivateChat = async (
  currentUserId: string,
  targetUserId: string
) => {
  return await services.findOnePrivateChat({
    //@ts-ignore
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};

const testFoundChatFromDb = (foundChatFromDb: PrivateChatMongo) => {
  chai.expect(foundChatFromDb).to.be.an(FIELD_TYPE.OBJECT);
  chai.expect(foundChatFromDb.participants).to.be.an(FIELD_TYPE.ARRAY);
  chai
    .expect(foundChatFromDb.participants)
    .to.be.an(FIELD_TYPE.ARRAY)
    .and.length(2);
};

const testOnePrivateChat = (data: {
  currentUserId: string;
  foundChat: PrivateChatMongo;
  foundChatFromDb: PrivateChatMongo;
  targetUserId: string;
}) => {
  chai.expect(data.foundChat).to.be.an(FIELD_TYPE.OBJECT);
  chai
    .expect(data.foundChat.participants)
    .to.be.an(FIELD_TYPE.ARRAY)
    .and.length(2);

  tesChatId(data.foundChat, data.foundChatFromDb);
  testMessages(data.foundChat, data.foundChatFromDb);
  testParticipants(data);
};

const tesChatId = (
  foundChat: PrivateChatMongo,
  foundChatFromDb: PrivateChatMongo
) => {
  assertionInitializerHelper().chatId({
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

    assertionInitializerHelper()
      .messageText({
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
    currentParticipantFromEvent,
    currentParticipantFromDb,
    targetParticipantFromEvent,
    targetParticipantFromDb,
  } = findAllParticipants({
    currentUserId: data.currentUserId,
    foundChat: data.foundChat,
    foundChatFromDb: data.foundChatFromDb,
    targetUserId: data.targetUserId,
  });

  assertionInitializerHelper()
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
      testValue: currentParticipantFromEvent.participantId,
    })
    .userId({
      equalValue: data.targetUserId,
      testValue: targetParticipantFromEvent.participantId,
    });
};

const findAllParticipants = (data: {
  currentUserId: string;
  foundChat: PrivateChatMongo;
  foundChatFromDb: PrivateChatMongo;
  targetUserId: string;
}) => {
  return {
    currentParticipantFromEvent: findParticipant(
      data.foundChat,
      data.currentUserId
    ),
    currentParticipantFromDb: findParticipant(
      data.foundChatFromDb,
      data.currentUserId
    ),
    targetParticipantFromEvent: findParticipant(
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
