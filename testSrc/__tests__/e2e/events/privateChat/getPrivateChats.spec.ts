import chai from "chai";

import { ParticipantId, ParticipantItem } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("getPrivateChats"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"getPrivateChats",
			"should get private chats related to client"
		),
		async () => {
			const { user: currentUser, socket: currentUserSocket } =
				await randomMaker.user();
			const { user: targetUser } = await randomMaker.user();

			const messageText = "Hello! Im messages!";
			await utils.requesterCollection
				.sendPrivateMessage(currentUserSocket)
				.sendFullFeaturedRequest({
					messageText,
					targetParticipantId: targetUser.userId,
				});

			const {
				data: { privateChats },
			} = await utils.requesterCollection
				.getPrivateChats(currentUserSocket)
				.sendFullFeaturedRequest();

			for (const item of privateChats) {
				assertionInitializerHelper().chatId(
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
				assertionInitializerHelper()
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
});

const isParticipantExist = (
	participants: ParticipantItem[],
	participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
