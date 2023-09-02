import { services } from "~/services";
import { GetPrivateChatsIO, SocketOnHandler } from "~/types";

export const getPrivateChats: SocketOnHandler<GetPrivateChatsIO> = async (
	socket
) => {
	const privateChats = await services.privateChat.findManyByParticipantId({
		participantId: socket.userId,
	});

	return {
		data: {
			privateChats,
		},
	};
};
