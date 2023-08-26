import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { GetUserPublicDataIO, SocketOnHandler } from "~/types";

export const getUserPublicData: SocketOnHandler<GetUserPublicDataIO> = async (
	_socket,
	data
) => {
	const { userId } = data;

	const user = await services.findOneUser({
		userId,
	});
	if (!user) throw errorStore.find("TARGET_USER_NOT_EXIST");

	return {
		data: {
			userPublicData: extractor.userPublicData(user),
		},
	};
};
