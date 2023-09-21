import { GetPublicDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getPublicData: SocketOnHandler<GetPublicDataIO> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const { publicData } = await services.user.getPublicData({
		targetUserId: userId,
	});

	return {
		data: {
			publicData,
		},
	};
};
