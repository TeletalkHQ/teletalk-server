import { ExtendedCellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findTargetUser: ServiceMiddleware<{
	targetUserId?: UserId;
	targetCellphone?: ExtendedCellphone;
}> = async (data) => {
	if (data.targetUserId) {
		const user = await coreServices.find({ userId: data.targetUserId });
		if (!user) throw errorStore.find("TARGET_USER_NOT_EXIST");
		data.targetUser = user;
	}

	if (data.targetCellphone) {
		const user = await coreServices.find(
			extractor.cellphone(data.targetCellphone)
		);
		if (!user) throw errorStore.find("TARGET_USER_NOT_EXIST");
		data.targetUser = user;
	}
};
