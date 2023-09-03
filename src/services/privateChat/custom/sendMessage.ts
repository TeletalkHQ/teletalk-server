import { randomMaker } from "utility-store";
import { UserId } from "utility-store/lib/types";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { models } from "~/models";
import { serviceMiddlewares } from "~/services/middlewares";
import {
	CreatedAt,
	MessageId,
	MessageItem,
	MessageText,
} from "~/types/datatypes";
import { HydratedPrivateChat } from "~/types/model";

import { coreServices } from "../core";

const chatModels = models.native;

export const sendMessage = serviceBuilder
	.create<
		{
			currentUserId: UserId;
			messageText: MessageText;
			targetParticipantId: UserId;
		},
		{
			chatId: string;
			createdAt: CreatedAt;
			messageId: MessageId;
		}
	>()
	.setMiddlewares([
		serviceMiddlewares.findCurrentUser,
		serviceMiddlewares.findTargetUser,
	])
	.setBody(async (data) => {
		const addedMessage = createNewMessage(data.messageText, data.currentUserId);

		const privateChat = await findPrivateChat(
			data.currentUserId,
			data.targetParticipantId
		);
		const fixedPrivateChat = await fixPrivateChat({
			currentUserId: data.currentUserId,
			privateChat,
			targetParticipantId: data.targetParticipantId,
		});

		await saveMessageOnPrivateChat({
			addedMessage,
			privateChat: fixedPrivateChat,
		});

		return {
			chatId: fixedPrivateChat.chatId,
			createdAt: addedMessage.createdAt,
			messageId: addedMessage.messageId,
		};
	})
	.build();

const findPrivateChat = (
	currentUserId: string,
	targetParticipantId: string
) => {
	return coreServices.find({
		["participants.participantId"]: {
			$all: [currentUserId, targetParticipantId],
		},
	});
};

const createNewMessage = (
	messageText: string,
	currentUserId: UserId
): MessageItem => ({
	createdAt: Date.now(),
	messageId: randomMaker.id(chatModels.messageId.maxLength),
	messageText,
	sender: {
		senderId: currentUserId,
	},
});

const fixPrivateChat = async (data: {
	currentUserId: UserId;
	privateChat: HydratedPrivateChat | null;
	targetParticipantId: UserId;
}) =>
	data.privateChat ||
	(await coreServices.create({
		chatId: createChatId(),
		createdAt: Date.now(),
		currentParticipantId: data.currentUserId,
		targetParticipantId: data.targetParticipantId,
	}));

const createChatId = () => randomMaker.id(chatModels.chatId.maxLength);

const saveMessageOnPrivateChat = async (data: {
	addedMessage: MessageItem;
	privateChat: HydratedPrivateChat;
}) => {
	data.privateChat.messages.push(data.addedMessage);
	await data.privateChat.save();
};
