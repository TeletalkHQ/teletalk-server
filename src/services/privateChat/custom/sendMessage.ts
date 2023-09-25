import {
	ChatId,
	CreatedAt,
	MessageId,
	MessageText,
	SenderId,
	SessionId,
	UserId,
} from "teletalk-type-store";
import { randomMaker } from "utility-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { models } from "~/models";
import { serviceMiddlewares } from "~/services/middlewares";
import { HydratedPrivateChat, HydratedUser } from "~/types/model";

const chatModels = models.native;

export const sendMessage = serviceBuilder
	.create<
		{
			currentSessionId: SessionId;
			targetParticipantId: UserId;
			messageText: MessageText;
		},
		{
			chatId: ChatId;
			createdAt: CreatedAt;
			messageId: MessageId;
			senderId: SenderId;
		},
		{
			privateChat: HydratedPrivateChat;
			currentParticipant: HydratedUser;
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
		const newMessage = {
			createdAt: Date.now(),
			messageId: randomMaker.id(chatModels.messageId.maxLength),
			messageText: data.messageText,
			sender: {
				senderId: data.currentParticipant.userId,
			},
		};

		data.privateChat.messages.push(newMessage);
		await data.privateChat.save();

		return {
			chatId: data.privateChat.chatId,
			createdAt: newMessage.createdAt,
			messageId: newMessage.messageId,
			senderId: data.currentParticipant.userId,
		};
	})
	.build();
