import { clientStatusStore } from "~/classes/ClientStatusStore";
import { GetOnlineClientsIO, SocketOnHandler } from "~/types";

export const getOnlineClients: SocketOnHandler<
	GetOnlineClientsIO
> = async () => {
	return {
		data: {
			onlineClients: await clientStatusStore.getOnlineClients(),
		},
	};
};
