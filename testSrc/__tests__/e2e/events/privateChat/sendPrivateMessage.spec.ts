import { UserId } from "utility-store/lib/types";

import { services } from "~/services";
import { SendPrivateMessageIO } from "~/types";
import { MessageText } from "~/types/datatypes";

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
    ))!;

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
      participantId: randomMaker.userId(),
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
  currentUserId: UserId,
  sentMessageResponse: SendPrivateMessageIO["output"],
  targetUserId: UserId,
  messageText: MessageText
) => {
  const chat = (await findOnePrivateChat(currentUserId, targetUserId))!;

  const currentParticipant = chat.participants.find(
    (i) => i.participantId === currentUserId
  )!;
  const targetParticipant = chat.participants.find(
    (i) => i.participantId === targetUserId
  )!;
  const foundMessage = chat.messages.find(
    (m) => m.messageId === sentMessageResponse.addedMessage.messageId
  )!;

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
  currentUserId: UserId,
  targetUserId: UserId
) => {
  return await services.findOnePrivateChat({
    "participants.participantId": {
      $all: [currentUserId, targetUserId],
    },
  });
};
