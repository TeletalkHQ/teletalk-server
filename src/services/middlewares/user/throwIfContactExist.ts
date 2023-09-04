import { errorStore } from "~/classes/ErrorStore";
import { ServiceMiddleware } from "~/types";
import { HydratedUser } from "~/types/model";

export const throwIfContactExist: ServiceMiddleware<{
	currentUser: HydratedUser;
	targetUser: HydratedUser;
}> = (data) => {
	const index = data.currentUser.contacts.findIndex(
		(i) => i.userId == data.targetUser.userId
	);

	if (index >= 0)
		throw {
			...errorStore.find("CONTACT_ITEM_EXIST"),
			queryData: data.targetUserId,
		};
};
