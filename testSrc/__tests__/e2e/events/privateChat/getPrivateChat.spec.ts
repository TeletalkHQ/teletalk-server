import { Socket } from "socket.io-client";
import { customTypeof } from "custom-typeof";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { services } from "@/services";

import { Message, Participant, PrivateChatMongo, UserMongo } from "@/types";

describe("getPrivateChat success tests", () => {
  it("Should get private chat related to client by chatId", async () => {
    const { user: currentUser, socket } = await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const messageText = "Hello! Im messages!";
    for (let i = 0; i < 10; i++) {
      const {
        data: { chatId },
      } = await helpers.requesterCollection
        .sendPrivateMessage(socket)
        .sendFullFeaturedRequest({
          messageText,
          participantId: targetUser.userId,
        });

      await testPrivateChat(chatId, socket, currentUser, targetUser);
    }
  });
});

await helpers.asyncDescribe("getPrivateChat fail tests", async () => {
  const { requester } = await helpers.setupRequester(
    helpers.requesterCollection.getPrivateChat
  );

  return () => {
    const data = {
      chatId: randomMaker.string(models.native.chatId.maxLength),
    };

    e2eFailTestInitializerHelper(requester).chatId(data);
  };
});

const testPrivateChat = async (
  chatId: string,
  socket: Socket,
  currentUser: UserMongo,
  targetUser: UserMongo
) => {
  const { privateChat } = await getPrivateChat(socket, chatId);
  expect(customTypeof.isObject(privateChat)).toBeTruthy();
  expect(customTypeof.isArray(privateChat.participants)).toBeTruthy();
  expect(privateChat.participants).toHaveLength(2);

  const privateChatFromDb = await findStoredPrivateChat(
    currentUser.userId,
    targetUser.userId
  );

  expect(customTypeof.isObject(privateChatFromDb)).toBeTruthy();
  expect(customTypeof.isArray(privateChatFromDb.participants)).toBeTruthy();
  expect(privateChatFromDb.participants).toHaveLength(2);

  testChatId(chatId, privateChat, privateChatFromDb);
  testMessages(privateChat, privateChatFromDb);
  testParticipants(
    currentUser.userId,
    privateChat,
    privateChatFromDb,
    targetUser.userId
  );
};

const getPrivateChat = async (socket: Socket, chatId: string) => {
  const { data } = await helpers.requesterCollection
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

const testChatId = (
  chatId: string,
  privateChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo
) => {
  assertionInitializerHelper().chatId({
    equalValue: chatId,
    testValue: privateChatFromDb.chatId,
  });
  assertionInitializerHelper().chatId({
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

const testParticipants = (
  currentUserId: string,
  foundChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo,
  targetUserId: string
) => {
  const {
    currentParticipantFromEvent,
    currentParticipantFromDb,
    targetParticipantFromEvent,
    targetParticipantFromDb,
  } = findAllParticipants(
    currentUserId,
    foundChat,
    privateChatFromDb,
    targetUserId
  );

  assertionInitializerHelper()
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
      testValue: currentParticipantFromEvent.participantId,
    })
    .userId({
      equalValue: targetUserId,
      testValue: targetParticipantFromEvent.participantId,
    });
};

const findAllParticipants = (
  currentUserId: string,
  foundChat: PrivateChatMongo,
  privateChatFromDb: PrivateChatMongo,
  targetUserId: string
) => {
  return {
    currentParticipantFromEvent: findParticipant(foundChat, currentUserId),
    currentParticipantFromDb: findParticipant(privateChatFromDb, currentUserId),
    targetParticipantFromEvent: findParticipant(foundChat, targetUserId),
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
