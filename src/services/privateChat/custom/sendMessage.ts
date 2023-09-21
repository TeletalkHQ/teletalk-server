import {
	CreatedAt,
	MessageId,
	MessageItem,
	MessageText,
	UserId,
} from "teletalk-type-store";
import { randomMaker } from "utility-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { models } from "~/models";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedPrivateChat } from "~/types/model";

const chatModels = models.native;

export const sendMessage = serviceBuilder
	.create<
		{
			currentParticipantId: UserId;
			targetParticipantId: UserId;
			messageText: MessageText;
		},
		{
			chatId: string;
			createdAt: CreatedAt;
			messageId: MessageId;
		},
		{
			privateChat: HydratedPrivateChat;
		}
	>()
	.setBeforeRunMiddlewares(
		serviceMiddlewares.findCurrentParticipant,
		serviceMiddlewares.findTargetParticipant,
		serviceMiddlewares.throwIfParticipantIsBlacklisted,
		serviceMiddlewares.createPrivateChatIfNotExist,
		serviceMiddlewares.findPrivateChat
	)
	.setBody(async (data) => {
		const addedMessage = createNewMessage(
			data.messageText,
			data.currentParticipantId
		);

		await saveMessageOnPrivateChat({
			addedMessage,
			privateChat: data.privateChat,
		});

		return {
			chatId: data.privateChat.chatId,
			createdAt: addedMessage.createdAt,
			messageId: addedMessage.messageId,
		};
	})
	.build();

const createNewMessage = (
	messageText: string,
	currentParticipantId: UserId
): MessageItem => ({
	createdAt: Date.now(),
	messageId: randomMaker.id(chatModels.messageId.maxLength),
	messageText,
	sender: {
		senderId: currentParticipantId,
	},
});

const saveMessageOnPrivateChat = async (data: {
	addedMessage: MessageItem;
	privateChat: HydratedPrivateChat;
}) => {
	data.privateChat.messages.push(data.addedMessage);
	await data.privateChat.save();
};
