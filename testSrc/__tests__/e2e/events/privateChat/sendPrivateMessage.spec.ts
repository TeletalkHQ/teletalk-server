import { expect } from "chai";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { services } from "@/services";

import {
  HydratedPrivateChatMongo,
  Message,
  Participant,
  StringMap,
} from "@/types";

import { utilities } from "$/utilities";

describe("send message success tests", () => {
  it("should start new chat and send message", async () => {
    const { socket, user: currentUser } = await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const requester = utilities.requesters.sendPrivateMessage(socket);

    const messagesLength = 10;
    for (let i = 0; i < messagesLength; i++) {
      const messageText = createMessage(i);
      const { data: sendMessageResponse } =
        await requester.sendFullFeaturedRequest({
          participantId: targetUser.userId,
          messageText,
        });

      await testData(
        currentUser.userId,
        sendMessageResponse,
        targetUser.userId,
        messageText
      );
    }

    const chat = (await findOnePrivateChat(
      currentUser.userId,
      targetUser.userId
    )) as HydratedPrivateChatMongo;

    expect(chat.messages.length).to.be.equal(messagesLength);
  });
});

// describe("send message fail tests", () => {
//   const requester = utilities.requesters.sendPrivateMessage();
//   helpers.configureFailTestRequester(requester);

//   const data = {
//     message: randomMaker.string(10),
//     participantId: randomMaker.id(),
//   };

//   testHelper
//     .createFailTest(requester)
//     .authentication()
//     .input(data)
//     .checkCurrentUserStatus(data)
//     .participantId(data)
//     .message(data)
//     .targetUserNotExist(data);
// });

const createMessage = (index: number) => `Hello! Im message #${index}`;

const testData = async (
  currentUserId: string,
  sentMessageResponse: StringMap,
  targetUserId: string,
  messageText: string
) => {
  const chat = (await findOnePrivateChat(
    currentUserId,
    targetUserId
  )) as HydratedPrivateChatMongo;

  const currentParticipant = chat.participants.find(
    (i) => i.participantId === currentUserId
  ) as Participant;
  const targetParticipant = chat.participants.find(
    (i) => i.participantId === targetUserId
  ) as Participant;
  const foundMessage = chat.messages.find(
    (m) => m.messageId === sentMessageResponse.newMessage.messageId
  ) as Message;

  assertionInitializerHelper()
    .chatId({
      equalValue: sentMessageResponse.chatId,
      testValue: chat.chatId,
    })
    .messageText({
      equalValue: messageText,
      testValue: foundMessage.messageText,
    })
    .messageText({
      equalValue: messageText,
      testValue: sentMessageResponse.newMessage.messageText,
    })
    .messageId({
      equalValue: sentMessageResponse.newMessage.messageId,
      testValue: foundMessage.messageId,
    })
    .userId({
      equalValue: targetUserId,
      testValue: targetParticipant.participantId,
    })
    .userId({
      equalValue: currentUserId,
      testValue: currentParticipant.participantId,
    })
    .userId({
      equalValue: currentUserId,
      testValue: sentMessageResponse.newMessage.sender.senderId,
    });
};

const findOnePrivateChat = async (
  currentUserId: string,
  targetUserId: string
) => {
  return await services.findOnePrivateChat({
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};
