import { authClientStore } from "~/classes/AuthClientStore";
import { services } from "~/services";
import { LogoutIO, SocketOnHandler } from "~/types";

export const logout: SocketOnHandler<LogoutIO> = async (socket) => {
	const { userId } = socket;

	await services.user.logout({
		clientId: socket.clientId,
		currentUserId: userId,
	});

	await authClientStore.remove(socket.clientId);

	return {
		data: {},
		options: {
			cbAfterEmit: () => {
				socket.rooms.clear();
				socket.disconnect();
			},
		},
	};
};
