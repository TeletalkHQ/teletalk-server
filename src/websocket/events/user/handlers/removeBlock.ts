import { RemoveBlockIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const removeBlock: SocketOnHandler<RemoveBlockIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;

	await services.user.removeBlock({
		currentUserId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedBlock: data,
		},
	};
};
