import { services } from "~/services";
import { SocketOnHandler, UpdateUserPublicDataIO } from "~/types";

export const updateUserPublicData: SocketOnHandler<
	UpdateUserPublicDataIO
> = async (socket, data) => {
	const { userId: currentUserId } = socket;
	const { bio, firstName, lastName, username } = data;

	const updatedPublicData = await services.updateUserPublicData({
		currentUserId,
		updateProperties: {
			bio,
			firstName,
			lastName,
			username,
		},
	});

	return {
		data: {
			userPublicData: updatedPublicData,
		},
	};
};
