import { services } from "~/services";
import {
  HydratedPrivateChatMongo,
  Message,
  Participant,
  StringMap,
} from "~/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("send message success tests", () => {
  it("should start new chat and send message", async () => {
    const { socket, user: currentUser } = await randomMaker.user();
    const { user: targetUser } = await randomMaker.user();

    const requester = helpers.requesterCollection.sendPrivateMessage(socket);

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

    expect(chat.messages.length).toBe(messagesLength);
  });
});

await helpers.asyncDescribe("send message fail tests", async () => {
  const { requester } = await helpers.setupRequester(
    helpers.requesterCollection.sendPrivateMessage
  );

  return () => {
    const data = {
      messageText: randomMaker.string(10),
      participantId: randomMaker.id(),
    };

    e2eFailTestInitializerHelper(requester)
      .input(data)
      .participantId(data)
      .messageText(data)
      .targetUserNotExist(data);
  };
});

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
    (m) => m.messageId === sentMessageResponse.addedMessage.messageId
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
      testValue: sentMessageResponse.addedMessage.messageText,
    })
    .messageId({
      equalValue: sentMessageResponse.addedMessage.messageId,
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
      testValue: sentMessageResponse.addedMessage.sender.senderId,
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
