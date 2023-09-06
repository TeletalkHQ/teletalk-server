import { clientStatusStore } from "~/classes/ClientStatusStore";
import { GetClientStatusIO, SocketOnHandler } from "~/types";

export const getClientStatus: SocketOnHandler<GetClientStatusIO> = async (
	_socket,
	data
) => {
	return {
		data: {
			isOnline: await clientStatusStore.isOnline(data.userId),
			userId: data.userId,
		},
	};
};
