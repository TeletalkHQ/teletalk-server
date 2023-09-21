import { RemoveContactIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const removeContact: SocketOnHandler<RemoveContactIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;

	await services.user.removeContact({
		currentUserId,
		targetUserId: data.userId,
	});

	return {
		data: {
			removedContact: { userId: data.userId },
		},
	};
};
