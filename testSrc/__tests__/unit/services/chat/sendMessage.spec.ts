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
						currentUserId: currentUser.userId,
						targetParticipantId: targetUser.userId,
						messageText: sendingMessageText,
					});

					const privateChat = (await services.privateChat.findByChatId({
						chatId: addedMessageInfo.chatId,
					})) as PrivateChatItem;

					const savedMessageItem = privateChat.messages.at(i)!;

					const isCurrentUserIdExistsInParticipants =
						privateChat.participants.some(
							(i) => i.participantId === currentUser.userId
						);
					chai.expect(isCurrentUserIdExistsInParticipants).to.be.equal(true);

					const isTargetUserIdExistsInParticipants =
						privateChat.participants.some(
							(i) => i.participantId === targetUser.userId
						);
					chai.expect(isTargetUserIdExistsInParticipants).to.be.equal(true);

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

describe(
	utils.createTestMessage.unitFailDescribe("sendMessage", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"sendMessage",
				"service",
				"TARGET_USER_NOT_EXIST"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				await utils.expectToFail_async(async () => {
					await services.privateChat.sendMessage({
						currentUserId: currentUser.userId,
						messageText: randomMaker.messageText(),
						targetParticipantId: randomMaker.userId(),
					});
				}, "TARGET_USER_NOT_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"sendMessage",
				"service",
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				await utils.expectToFail_async(async () => {
					await services.privateChat.sendMessage({
						currentUserId: randomMaker.userId(),
						messageText: randomMaker.messageText(),
						targetParticipantId: randomMaker.userId(),
					});
				}, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
);
