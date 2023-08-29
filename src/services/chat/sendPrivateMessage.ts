import { randomMaker } from "utility-store";
import { UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { PrivateChatService } from "~/types";
import {
	CreatedAt,
	MessageId,
	MessageItem,
	MessageText,
} from "~/types/datatypes";
import { HydratedPrivateChat } from "~/types/model";

import { findOneUser } from "../user/findOneUser";
import { createPrivateChat } from "./createPrivateChat";
import { findOnePrivateChat } from "./findOnePrivateChat";

const chatModels = models.native;

//REFACTOR: Separate createPrivateChat parts
export const sendPrivateMessage: PrivateChatService<
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
> = async (data) => {
	const currentUser = await findOneUser({ userId: data.currentUserId });
	if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	const targetUser = await findOneUser({
		userId: data.targetParticipantId,
	});
	if (!targetUser) throw errorStore.find("TARGET_USER_NOT_EXIST");

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
};

const findPrivateChat = (
	currentUserId: string,
	targetParticipantId: string
) => {
	return findOnePrivateChat({
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
	(await createPrivateChat({
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
