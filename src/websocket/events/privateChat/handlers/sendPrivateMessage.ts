import { services } from "~/services";
import { EventName, SendPrivateMessageIO, SocketOnHandler } from "~/types";
import { ChatId, MessageItem } from "~/types/datatypes";
import { utils } from "~/utils";

export const sendPrivateMessage: SocketOnHandler<SendPrivateMessageIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { targetParticipantId, messageText } = data;

	const { chatId, createdAt, messageId } = await services.sendPrivateMessage({
		currentUserId,
		targetParticipantId,
		messageText,
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
			"sendPrivateMessage",
			utils.createSuccessResponse("sendPrivateMessage", returnData)
		);

	return {
		data: returnData,
	};
};
