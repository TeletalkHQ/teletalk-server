import { services } from "~/services";
import { GetPublicDataIO, SocketOnHandler } from "~/types";

export const getPublicData: SocketOnHandler<GetPublicDataIO> = async (
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
