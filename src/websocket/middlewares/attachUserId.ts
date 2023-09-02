import { clientStore } from "~/classes/ClientStore";
import { SocketMiddleware, StoredClient } from "~/types";

export const attachUserId: SocketMiddleware = async (socket, next) => {
	socket.userId = (
		(await clientStore.find(socket.clientId)) as StoredClient
	).userId;

	next();
};
