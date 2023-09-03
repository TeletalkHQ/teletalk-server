import { errorStore } from "~/classes/ErrorStore";
import { ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const throwIfBlacklistItemExist: ServiceMiddleware<{
	currentUser: HydratedUser;
	targetUserId: UserId;
}> = (data) => {
	const index = data.currentUser.blacklist.findIndex(
		(i) => i.userId === data.targetUserId
	);
	if (index !== -1)
		throw {
			...errorStore.find("BLACKLIST_ITEM_EXIST"),
			targetUserData: data.targetUserId,
		};
};
