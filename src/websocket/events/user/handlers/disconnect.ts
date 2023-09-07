import { clientStatusStore } from "~/classes/ClientStatusStore";
import { DisconnectIO, EventName, SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const disconnect: SocketOnHandler<DisconnectIO> = async (socket) => {
	if (socket.userId) {
		await clientStatusStore.decConnection(socket.userId);

		const response = utils.createSuccessResponse("getClientStatus", {
			isOnline: await clientStatusStore.isOnline(socket.userId),
			userId: socket.userId,
		});

		socket.broadcast.emit<EventName>(response.eventName, response);
	}

	return {
		data: {},
		options: {
			shouldEmitReturnValue: false,
		},
	};
};
