import { services } from "~/services";
import { SocketOnHandler, UpdatePublicUserDataIO } from "~/types";

export const updatePublicUserData: SocketOnHandler<
	UpdatePublicUserDataIO
> = async (socket, data) => {
	const { userId: currentUserId } = socket;
	const { bio, firstName, lastName, username } = data;

	const updatedPublicData = await services.updatePublicUserData({
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
			publicUserData: updatedPublicData,
		},
	};
};
