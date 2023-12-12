import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("sendMessage", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "sendMessage",
        "event",
        "should start new chat and send message"
      ),
      async () => {
        const { socket, user: currentUser } = await randomMaker.e2eUser();
        const { user: targetUser } = await randomMaker.e2eUser();

        const messageText = "Hello! Im message";

        const { data: sendMessageResponse } = await utils.requesterCollection
          .sendMessage(socket)
          .emitFull({
            targetParticipantId: targetUser.userId,
            messageText,
          });

        assertion()
          .chatId(
            {
              testValue: sendMessageResponse.chatId,
            },
            {
              stringEquality: false,
            }
          )
          .messageText({
            equalValue: messageText,
            testValue: sendMessageResponse.addedMessage.messageText,
          })
          .messageId(
            {
              testValue: sendMessageResponse.addedMessage.messageId,
            },
            {
              stringEquality: false,
            }
          )
          .userId({
            equalValue: currentUser.userId,
            testValue: sendMessageResponse.addedMessage.sender.senderId,
          });
      }
    );
  }
);
