import { UnknownCellphone, UserId } from "teletalk-type-store";
import { extractor, utils } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { HydratedUser, ServiceMiddleware } from "~/types";

export const throwIfSelfDataRequested: ServiceMiddleware<
	{
		targetUserId?: UserId;
		targetUserCellphone?: UnknownCellphone;
		currentUser: HydratedUser;
	},
	void
> = async (data) => {
	if (data.targetUserId) {
		if (data.currentUser.userId === data.targetUserId)
			throw {
				...errorStore.find("SELF_DATA_REQUESTED"),
				targetUserId: data.targetUserId,
			};
	} else if (data.targetUserCellphone) {
		const currentUserCellphone = extractor.cellphone(data.currentUser);

		if (
			utils.isDataHasEqualityWithTargetCellphone(
				data.targetUserCellphone,
				currentUserCellphone
			)
		)
			throw {
				...errorStore.find("SELF_DATA_REQUESTED"),
				targetUserCellphone: data.targetUserCellphone,
			};
	}
};
