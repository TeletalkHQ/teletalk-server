import { services } from "~/services";
import { RemoveBlockIO, SocketOnHandler } from "~/types";

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
