import { services } from "~/services";
import { GetPrivateChatIO, SocketOnHandler } from "~/types";

export const getPrivateChat: SocketOnHandler<GetPrivateChatIO> = async (
	_socket,
	data
) => {
	const privateChat = await services.privateChat.findByChatId({
		chatId: data.chatId,
	});

	return { data: { privateChat: JSON.parse(JSON.stringify(privateChat)) } };
};
