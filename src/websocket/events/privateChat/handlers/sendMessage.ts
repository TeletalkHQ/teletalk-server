import {
	ChatId,
	EventName,
	MessageItem,
	SendMessageIO,
} from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const sendMessage: SocketOnHandler<SendMessageIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { targetParticipantId, messageText } = data;

	const { chatId, createdAt, messageId } =
		await services.privateChat.sendMessage({
			currentParticipantId: currentUserId,
			messageText,
			targetParticipantId,
		});

	const returnData: { addedMessage: MessageItem; chatId: ChatId } = {
		addedMessage: {
			createdAt,
			messageId,
			messageText,
			sender: {
				senderId: currentUserId,
			},
		},
		chatId,
	};

	socket
		.to(targetParticipantId)
		.emit<EventName>(
			"sendMessage",
			utils.createSuccessResponse("sendMessage", returnData)
		);

	return {
		data: returnData,
	};
};
