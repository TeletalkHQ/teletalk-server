import { services } from "~/services";
import { GetUserPublicDataIO, SocketOnHandler } from "~/types";

export const getUserPublicData: SocketOnHandler<GetUserPublicDataIO> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { userPublicData } = await services.getUserPublicData({ userId });

	return {
		data: {
			userPublicData,
		},
	};
};
