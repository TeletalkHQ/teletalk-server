import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { SocketOnHandler, UpdateContactIO } from "~/types";

export const updateContact: SocketOnHandler<UpdateContactIO> = async (
	socket,
	data
) => {
	const { userId: currentUserId } = socket;

	await services.user.updateContact({
		currentUserId,
		editValues: extractor.fullName(data),
		targetUserId: data.userId,
	});

	return {
		data: {
			updatedContact: data,
		},
	};
};
