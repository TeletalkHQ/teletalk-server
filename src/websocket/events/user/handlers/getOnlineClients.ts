import { GetOnlineClientsIO } from "teletalk-type-store";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getOnlineClients: SocketOnHandler<GetOnlineClientsIO> = async (
	socket
) => {
	const {
		user: { userId },
	} = await services.user.findBySessionId({
		currentSessionId: socket.sessionId,
	});

	const onlineClients = (await clientStatusStore.getOnlineClients()).filter(
		(i) => i.userId !== userId
	);

	return {
		data: {
			onlineClients,
		},
	};
};
