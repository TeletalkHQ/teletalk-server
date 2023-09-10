import { ExtendedCellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findCurrentUser: ServiceMiddleware<
	{
		currentUserId?: UserId;
		currentUserCellphone?: ExtendedCellphone;
	},
	{
		currentUser: HydratedUser;
	}
> = async (data) => {
	let u: HydratedUser | null;

	if (data.currentUserId) {
		u = await coreServices.find({
			userId: data.currentUserId,
		});
	} else if (data.currentUserCellphone) {
		u = await coreServices.find(extractor.cellphone(data.currentUserCellphone));
	}

	if (!u!) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	return {
		currentUser: u,
	};
};
