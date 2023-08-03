import { services } from '~/services';
import { EventName, SendPrivateMessageIO, SocketOnHandler } from '~/types';
import { utils } from '~/utils';

export const sendPrivateMessage: SocketOnHandler<SendPrivateMessageIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;
	const { participantId, messageText: text } = data;

	const { chatId, addedMessage } = await services.sendPrivateMessage({
		currentUserId,
		participantId,
		messageText: text,
	});

	const returnData = {
		addedMessage,
		chatId,
	};

	socket
		.to(currentUserId)
		.to(participantId)
		.emit<EventName>(
			'sendPrivateMessage',
			utils.createSuccessResponse('sendPrivateMessage', returnData)
		);

	return {
		data: returnData,
	};
};
