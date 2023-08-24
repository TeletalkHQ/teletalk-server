import { errorThrower } from "utility-store";
import { UserData, UserId } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { UserService } from "~/types";
import { HydratedUser } from "~/types/models";

import { findOneUser } from "./findOneUser";

export const removeBlock: UserService<
	{
		currentUserId: UserId;
		targetUserId: UserId;
	},
	void
> = async (data) => {
	const currentUser = await findCurrentUser(data.currentUserId);
	if (!currentUser) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	const { index } = checkExistenceOfBlacklistItem(
		currentUser.blacklist,
		data.targetUserId
	);

	await removeBlockAndSave(currentUser, index);
};

const findCurrentUser = async (currentUserId: string) => {
	return await findOneUser({
		userId: currentUserId,
	});
};

const checkExistenceOfBlacklistItem = (
	blacklist: UserData["blacklist"],
	targetUserId: UserId
) => {
	const index = blacklist.findIndex((i) => i.userId === targetUserId);
	errorThrower(index === -1, () => errorStore.find("BLACKLIST_ITEM_NOT_EXIST"));

	return { index };
};

const removeBlockAndSave = async (currentUser: HydratedUser, index: number) => {
	currentUser.blacklist.splice(index, 1);
	await currentUser.save();
};
