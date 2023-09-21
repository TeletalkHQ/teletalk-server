import { GetOnlineClientsIO } from "teletalk-type-store";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { SocketOnHandler } from "~/types";

export const getOnlineClients: SocketOnHandler<GetOnlineClientsIO> = async (
	socket
) => {
	const onlineClients = (await clientStatusStore.getOnlineClients()).filter(
		(i) => i.userId !== socket.userId
	);

	return {
		data: {
			onlineClients,
		},
	};
};
