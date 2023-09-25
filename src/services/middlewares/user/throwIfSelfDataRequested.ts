import { UnknownCellphone, UserId } from "teletalk-type-store";
import {
	errorThrower,
	extractor,
	isDataHasEqualityWithTargetCellphone,
} from "utility-store";

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
		errorThrower(data.currentUser.userId === data.targetUserId, {
			...errorStore.find("SELF_DATA_REQUESTED"),
			targetUserId: data.targetUserId,
		});
	} else if (data.targetUserCellphone) {
		const currentUserCellphone = extractor.cellphone(data.currentUser);

		errorThrower(
			isDataHasEqualityWithTargetCellphone(
				data.targetUserCellphone,
				currentUserCellphone
			),
			{
				...errorStore.find("SELF_DATA_REQUESTED"),
				targetUserCellphone: data.targetUserCellphone,
			}
		);
	}
};
