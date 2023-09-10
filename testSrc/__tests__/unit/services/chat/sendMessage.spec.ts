import chai from "chai";

import { services } from "~/services";
import { PrivateChatItem } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
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
				const { user: currentUser } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const length = 10;

				for (let i = 0; i < length; i++) {
					const sendingMessageText = randomMaker.messageText();

					const addedMessageInfo = await services.privateChat.sendMessage({
						currentParticipantId: currentUser.userId,
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

					assertionInitializerHelper()
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
	currentParticipantId: randomMaker.userId(),
	messageText: randomMaker.messageText(),
	targetParticipantId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"sendMessage",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentParticipantId: currentUser.userId,
			messageText: randomMaker.messageText(),
			targetParticipantId: randomMaker.userId(),
		};
	}
);
