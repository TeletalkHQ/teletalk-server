import { authClientStore } from "~/classes/AuthClientStore";
import { SocketMiddleware, StoredClient } from "~/types";

export const attachUserId: SocketMiddleware = async (socket, next) => {
	socket.userId = (
		(await authClientStore.find(socket.clientId)) as StoredClient
	).userId;

	next();
};
