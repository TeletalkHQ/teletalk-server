import { EventName, UpdateAvatarIO } from "teletalk-type-store";

import { services } from "~/services";
import { SocketOnHandler } from "~/types";
import { utils } from "~/utils";

export const updateAvatar: SocketOnHandler<UpdateAvatarIO> = async (
	socket,
	data
) => {
	await services.user.updateAvatar({
		currentUserId: socket.userId,
		avatarSrc: data.avatarSrc,
	});

	const response = utils.createSuccessResponse("updateAvatar", {
		avatarSrc: data.avatarSrc,
		userId: socket.userId,
	});

	socket.broadcast.emit<EventName>("updateAvatar", response);

	return {
		data: {
			avatarSrc: data.avatarSrc,
			userId: socket.userId,
		},
	};
};
