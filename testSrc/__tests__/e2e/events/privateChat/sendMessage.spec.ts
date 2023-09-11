import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
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
				const { socket, user: currentUser } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const messageText = "Hello! Im message";

				const { data: sendMessageResponse } = await utils.requesterCollection
					.sendMessage(socket)
					.emitFull({
						targetParticipantId: targetUser.userId,
						messageText,
					});

				//REFACTOR: replace with `messageItem` and use new stringEquality method
				assertionInitializerHelper()
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
