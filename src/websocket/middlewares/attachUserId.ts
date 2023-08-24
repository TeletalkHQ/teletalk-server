import { clientStore } from "~/classes/ClientStore";
import { SocketMiddleware } from "~/types";

export const attachUserId: SocketMiddleware = async (socket, next) => {
	socket.userId = (await clientStore.find(socket.clientId))!.userId;

	next();
};
