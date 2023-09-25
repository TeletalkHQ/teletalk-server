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
	const { targetParticipantId, messageText } = data;

	const { chatId, createdAt, messageId, senderId } =
		await services.privateChat.sendMessage({
			currentSessionId: socket.sessionId,
			messageText,
			targetParticipantId,
		});

	const returnData: { addedMessage: MessageItem; chatId: ChatId } = {
		addedMessage: {
			createdAt,
			messageId,
			messageText,
			sender: {
				senderId,
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
