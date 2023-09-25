import { RemoveBlockIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const removeBlock: SocketOnHandler<RemoveBlockIO> = async (
	socket,
	data
) => {
	await services.user.removeBlock({
		currentSessionId: socket.sessionId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedBlock: data,
		},
	};
};
