import { clientStatusStore } from "~/classes/ClientStatusStore";
import { EventName, JoinRoomIO, SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const joinRoom: SocketOnHandler<JoinRoomIO> = async (socket) => {
	socket.join(socket.userId);

	clientStatusStore.incConnection(socket.userId);

	const responseToGetClientStatus = utils.createSuccessResponse(
		"getClientStatus",
		{
			isOnline: true,
			userId: socket.userId,
		}
	);

	const onlineUsersWithoutCurrentUser = (
		await clientStatusStore.getOnlineClients()
	).filter((i) => i.userId !== socket.userId);

	const responseToGetOnlineClients = utils.createSuccessResponse(
		"getOnlineClients",
		{
			onlineClients: onlineUsersWithoutCurrentUser,
		}
	);

	socket.emit<EventName>("getOnlineClients", responseToGetOnlineClients);

	socket.broadcast.emit<EventName>(
		responseToGetClientStatus.eventName,
		responseToGetClientStatus
	);

	return {
		data: {},
	};
};
