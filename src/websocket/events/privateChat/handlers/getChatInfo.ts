import { errorStore } from '~/classes/ErrorStore';
import { services } from '~/services';
import { GetChatInfoIO, SocketOnHandler } from '~/types';

export const getChatInfo: SocketOnHandler<GetChatInfoIO> = async (
	_socket,
	data
) => {
	const privateChat = await services.findOnePrivateChatByChatId({
		chatId: data.chatId,
	});

	if (!privateChat) throw errorStore.find('CHAT_NOT_EXIST');

	const { chatId, createdAt, participants } = privateChat;

	return {
		data: {
			chatInfo: {
				chatId,
				createdAt,
				participants,
			},
		},
	};
};
