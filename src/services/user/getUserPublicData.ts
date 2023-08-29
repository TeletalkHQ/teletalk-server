import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { UserService } from "~/types";
import { UserId, UserPublicData } from "~/types/datatypes";

import { findOneUser } from "./findOneUser";

export const getUserPublicData: UserService<
	{ userId: UserId },
	{ userPublicData: UserPublicData }
> = async (data) => {
	const userData = await findOneUser({
		userId: data.userId,
	});
	if (!userData) throw errorStore.find("TARGET_USER_NOT_EXIST");

	return {
		userPublicData: extractor.userPublicData(userData),
	};
};
