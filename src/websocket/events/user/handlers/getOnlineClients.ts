import { clientStatusStore } from "~/classes/ClientStatusStore";
import { GetOnlineClientsIO, SocketOnHandler } from "~/types";

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
