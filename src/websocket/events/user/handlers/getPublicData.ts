import { services } from "~/services";
import { GetUserPublicDataIO, SocketOnHandler } from "~/types";

export const getPublicData: SocketOnHandler<GetUserPublicDataIO> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { userPublicData } = await services.user.getPublicData({
		targetUserId: userId,
	});

	return {
		data: {
			userPublicData,
		},
	};
};
