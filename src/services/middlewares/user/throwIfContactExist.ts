/* eslint-disable indent */
import { UnknownCellphone, UserId } from "teletalk-type-store";
import {
	errorThrower,
	isDataHasEqualityWithTargetCellphone,
} from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { ServiceMiddleware } from "~/types";
import { HydratedUser } from "~/types/model";

export const throwIfContactExist: ServiceMiddleware<
	{
		currentUser: HydratedUser;
		targetUserId?: UserId;
		targetUserCellphone?: UnknownCellphone;
	},
	void
> = (data) => {
	const { contacts } = data.currentUser;
	const error = {
		...errorStore.find("CONTACT_ITEM_EXIST"),
		queryData: data.targetUserId,
	};

	if (data.targetUserId) {
		errorThrower(
			contacts.some((i) => i.userId == data.targetUserId),
			error
		);
	} else if (data.targetUserCellphone) {
		errorThrower(
			contacts.some((i) =>
				//@ts-ignore
				isDataHasEqualityWithTargetCellphone(i, data.targetUserCellphone)
			),
			error
		);
	}
};
