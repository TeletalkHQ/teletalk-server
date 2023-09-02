import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { EditContactIO, SocketOnHandler } from "~/types";

export const updateContact: SocketOnHandler<EditContactIO> = async (
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
			editedContact: data,
		},
	};
};
