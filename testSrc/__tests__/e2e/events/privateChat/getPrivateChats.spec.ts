import chai from "chai";
import { ParticipantId, Participants } from "teletalk-type-store";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("getPrivateChats", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "getPrivateChats",
        "event",
        "should get private chats related to session"
      ),
      async () => {
        const { user: currentUser, socket: currentUserSocket } =
          await randomMaker.e2eUser();
        const { user: targetUser } = await randomMaker.e2eUser();

        const messageText = "Hello! Im messages!";
        await utils.requesterCollection
          .sendMessage(currentUserSocket)
          .emitFull({
            messageText,
            targetParticipantId: targetUser.userId,
          });

        const {
          data: { privateChats },
        } = await utils.requesterCollection
          .getPrivateChats(currentUserSocket)
          .emitFull();

        for (const item of privateChats) {
          assertion().chatId(
            {
              testValue: item.chatId,
            },
            {
              stringEquality: false,
            }
          );

          chai
            .expect(isParticipantExist(item.participants, currentUser.userId))
            .to.be.equal(true);
          chai
            .expect(isParticipantExist(item.participants, targetUser.userId))
            .to.be.equal(true);

          const messageItem = item.messages.at(0)!;
          assertion()
            .messageText({
              equalValue: messageText,
              testValue: messageItem.messageText,
            })
            .messageId(
              {
                testValue: messageItem.messageId,
              },
              {
                stringEquality: false,
              }
            )
            .senderId({
              equalValue: messageItem.sender.senderId,
              testValue: currentUser.userId,
            });
        }
      }
    );
  }
);

const isParticipantExist = (
  participants: Participants,
  participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
