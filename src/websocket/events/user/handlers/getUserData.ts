import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { GetUserDataIO, SocketOnHandler } from "~/types";

export const getUserData: SocketOnHandler<GetUserDataIO> = async (socket) => {
	const { userId: currentUserId } = socket;

	const userData = await services.user.findByUserId({
		currentUserId,
	});

	return {
		data: {
			user: extractor.userData(userData),
		},
	};
};
