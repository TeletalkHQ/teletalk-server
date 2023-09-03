import { Cellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { coreServices } from "~/services/user/core";
import { ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findCurrentUser: ServiceMiddleware<{
	currentUserId?: UserId;
	currentCellphone?: Cellphone;
}> = async (data) => {
	const user = await coreServices.find({ userId: data.currentUserId });
	if (!user) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	data.currentUser = user;
};
