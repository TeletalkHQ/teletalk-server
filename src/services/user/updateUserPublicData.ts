import { UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { UserService } from "~/types";
import { UserPublicData } from "~/types/datatypes";

import { findOneUser } from "./findOneUser";

export const updateUserPublicData: UserService<
	{
		currentUserId: UserId;
		updateProperties: Partial<UserPublicData>;
	},
	UserPublicData
> = async (data) => {
	const currentUser = await findCurrentUser(data.currentUserId);
	if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	const oldPublicData = extractor.userPublicData(currentUser);

	await currentUser.updateOne(data.updateProperties);

	return extractor.userPublicData({
		...oldPublicData,
		...data.updateProperties,
	});
};

const findCurrentUser = async (currentUserId: UserId) => {
	return await findOneUser({
		userId: currentUserId,
	});
};
