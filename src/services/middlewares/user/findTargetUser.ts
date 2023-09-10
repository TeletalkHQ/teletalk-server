import { ExtendedCellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findTargetUser: ServiceMiddleware<
	{
		targetUserId?: UserId;
		targetUserCellphone?: ExtendedCellphone;
	},
	{
		targetUser: HydratedUser;
	}
> = async (data) => {
	let p: HydratedUser | null;

	if (data.targetUserId) {
		p = await coreServices.find({
			userId: data.targetUserId,
		});
	} else if (data.targetUserCellphone) {
		p = await coreServices.find(extractor.cellphone(data.targetUserCellphone));
	}

	if (!p!) throw errorStore.find("TARGET_USER_NOT_EXIST");

	return {
		targetUser: p,
	};
};
