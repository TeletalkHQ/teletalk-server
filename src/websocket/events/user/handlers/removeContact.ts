import { RemoveContactIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const removeContact: SocketOnHandler<RemoveContactIO> = async (
	socket,
	data
) => {
	await services.user.removeContact({
		currentSessionId: socket.sessionId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedContact: {
				userId: data.userId,
			},
		},
	};
};
