import { clientStore } from '~/classes/ClientStore';
import { services } from '~/services';
import { LogoutIO, SocketOnHandler } from '~/types';

export const logout: SocketOnHandler<LogoutIO> = async (socket) => {
	const { userId } = socket;

	await services.logout({
		clientId: socket.clientId,
		userId,
	});

	socket.rooms.clear();
	await clientStore.remove(socket.clientId);

	return {
		data: {},
	};
};
