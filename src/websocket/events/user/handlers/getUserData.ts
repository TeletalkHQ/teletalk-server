import { GetUserDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
	const { user } = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});

	return {
		data: {
			user,
		},
	};
};
