import { AddBlockIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const addBlock: SocketOnHandler<AddBlockIO> = async (socket, data) => {
	await services.user.addBlock({
		targetUserId: data.userId,
		currentSessionId: socket.sessionId,
	});

	return {
		data: {
			blockedUser: {
				userId: data.userId,
			},
		},
	};
};
