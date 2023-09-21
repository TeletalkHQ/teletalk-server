import { EventName, JoinIO } from "teletalk-type-store";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const join: SocketOnHandler<JoinIO> = async (socket) => {
	// deepcode ignore PureMethodReturnValueIgnored: <please specify a reason of ignoring this>
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
