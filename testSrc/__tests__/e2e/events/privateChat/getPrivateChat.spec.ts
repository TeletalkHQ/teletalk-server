import chai from "chai";
import { ParticipantId, Participants } from "teletalk-type-store";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("getPrivateChat", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"getPrivateChat",
				"event",
				"should get private chats related to session"
			),
			async () => {
				const { socket: currentUserSocket, user: currentUser } =
					await randomMaker.e2eUser();
				const { user: targetUser } = await randomMaker.e2eUser();

				const messageText = "Hello! Im messages!";

				const {
					data: { chatId },
				} = await utils.requesterCollection
					.sendMessage(currentUserSocket)
					.emitFull({
						messageText,
						targetParticipantId: targetUser.userId,
					});

				const {
					data: { privateChat },
				} = await utils.requesterCollection
					.getPrivateChat(currentUserSocket)
					.emitFull({
						chatId,
					});

				assertion().chatId({
					testValue: privateChat.chatId,
					equalValue: chatId,
				});

				chai
					.expect(
						isParticipantExist(privateChat.participants, currentUser.userId)
					)
					.to.be.equal(true);
				chai
					.expect(
						isParticipantExist(privateChat.participants, targetUser.userId)
					)
					.to.be.equal(true);

				const messageItem = privateChat.messages.at(0)!;
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
		);
	}
);

const isParticipantExist = (
	participants: Participants,
	participantId: ParticipantId
) => participants.some((i) => i.participantId === participantId)!;
