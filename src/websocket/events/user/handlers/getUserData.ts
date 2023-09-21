import { GetUserDataIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
	const { userId: currentUserId } = socket;

	const userData = await services.user.findByUserId({
		currentUserId,
	});

	return {
		data: {
			user: userData,
		},
	};
};
