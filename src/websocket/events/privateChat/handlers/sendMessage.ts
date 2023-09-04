import { services } from "~/services";
import { EventName, SendMessageIO, SocketOnHandler } from "~/types";
import { ChatId, MessageItem } from "~/types/datatypes";
import { utils } from "~/utils";

export const sendMessage: SocketOnHandler<SendMessageIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { targetParticipantId, messageText } = data;

	const { chatId, createdAt, messageId } =
		await services.privateChat.sendMessage({
			currentUserId,
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
