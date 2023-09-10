import { errorStore } from "~/classes/ErrorStore";
import { ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";
import { HydratedUser } from "~/types/model";

export const throwIfContactNotExist: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		targetUserId: UserId;
	},
	void
> = (data) => {
	const index = data.currentUser.contacts.findIndex(
		(i) => i.userId == data.targetUserId
	);

	if (index === -1)
		throw {
			...errorStore.find("CONTACT_ITEM_NOT_EXIST"),
			queryData: data.targetUserId,
		};
};
