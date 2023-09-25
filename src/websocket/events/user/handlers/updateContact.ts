import { UpdateContactIO } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { SocketOnHandler } from "~/types";

export const updateContact: SocketOnHandler<UpdateContactIO> = async (
	socket,
	data
) => {
	await services.user.updateContact({
		currentSessionId: socket.sessionId,
		editValues: extractor.fullName(data),
		targetUserId: data.userId,
	});

	return {
		data: {
			updatedContact: data,
		},
	};
};
