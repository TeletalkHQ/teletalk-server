import { clientStatusStore } from "~/classes/ClientStatusStore";
import { EventName, JoinIO, SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const join: SocketOnHandler<JoinIO> = async (socket) => {
	socket.join(socket.userId);
	clientStatusStore.incConnection(socket.userId);

	const responseToGetClientStatus = utils.createSuccessResponse(
		"getClientStatus",
		{
			isOnline: true,
			userId: socket.userId,
		}
	);

	socket.broadcast.emit<EventName>(
		responseToGetClientStatus.eventName,
		responseToGetClientStatus
	);

	return {
		data: {},
	};
};
