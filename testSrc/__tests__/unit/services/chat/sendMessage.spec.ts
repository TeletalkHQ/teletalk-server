import chai from "chai";
import { PrivateChatItem } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.unitSuccessDescribe("sendMessage", "service"),
  () => {
    it(
      utils.createTestMessage.unitSuccessTest(
        "sendMessage",
        "service",
        "should be able to send private message to someone"
      ),
      async () => {
        const { user: currentUser, sessionId } =
          await randomMaker.serviceUser();
        const { user: targetUser } = await randomMaker.serviceUser();

        const length = 10;

        for (let i = 0; i < length; i++) {
          const sendingMessageText = randomMaker.messageText();

          const addedMessageInfo = await services.privateChat.sendMessage({
            currentSessionId: sessionId,
            targetParticipantId: targetUser.userId,
            messageText: sendingMessageText,
          });

          const privateChat = (await services.privateChat.findByChatId({
            chatId: addedMessageInfo.chatId,
          })) as PrivateChatItem;

          const savedMessageItem = privateChat.messages.at(i)!;

          const isParticipantIdExistInParticipants =
            privateChat.participants.some(
              (i) => i.participantId === currentUser.userId
            );
          chai.expect(isParticipantIdExistInParticipants).to.be.equal(true);

          const isTargetUserIdExistInParticipants =
            privateChat.participants.some(
              (i) => i.participantId === targetUser.userId
            );
          chai.expect(isTargetUserIdExistInParticipants).to.be.equal(true);

          assertion()
            .chatId({
              testValue: addedMessageInfo.chatId,
              equalValue: privateChat.chatId,
            })
            .messageText({
              equalValue: sendingMessageText,
              testValue: savedMessageItem.messageText,
            })
            .messageId({
              testValue: savedMessageItem.messageId,
              equalValue: addedMessageInfo.messageId,
            })
            .userId({
              equalValue: currentUser.userId,
              testValue: savedMessageItem.sender.senderId,
            });
        }
      }
    );
  }
);

await utils.generateServiceFailTest("sendMessage", "CURRENT_USER_NOT_EXIST", {
  currentSessionId: randomMaker.sessionId(),
  messageText: randomMaker.messageText(),
  targetParticipantId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
  "sendMessage",
  "TARGET_USER_NOT_EXIST",
  async () => {
    const { sessionId } = await randomMaker.serviceUser();

    return {
      currentSessionId: sessionId,
      messageText: randomMaker.messageText(),
      targetParticipantId: randomMaker.userId(),
    };
  }
);
