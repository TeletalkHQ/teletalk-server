import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("sendPrivateMessage"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"sendPrivateMessage",
				"should start new chat and send message"
			),
			async () => {
				const { socket, user: currentUser } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const messageText = "Hello! Im message";

				const { data: sendMessageResponse } = await utils.requesterCollection
					.sendPrivateMessage(socket)
					.sendFullFeaturedRequest({
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

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("sendPrivateMessage"),
	async () => {
		const { requester } = await utils.setupRequester(
			utils.requesterCollection.sendPrivateMessage
		);

		return () => {
			const data = {
				messageText: randomMaker.string(10),
				targetParticipantId: randomMaker.userId(),
			};

			e2eFailTestInitializerHelper(requester)
				.input(data)
				.targetParticipantId(data)
				.messageText(data);
		};
	}
);
