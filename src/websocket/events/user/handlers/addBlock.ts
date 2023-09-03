import { services } from "~/services";
import { AddBlockIO, SocketOnHandler } from "~/types";

export const addBlock: SocketOnHandler<AddBlockIO> = async (socket, data) => {
	const { userId: currentUserId } = socket;

	await services.user.addBlock({
		targetUserId: data.userId,
		currentUserId,
	});

	return {
		data: {
			blockedUser: {
				userId: data.userId,
			},
		},
	};
};
