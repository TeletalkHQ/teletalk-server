/* eslint-disable indent */
import { Cellphone, UserId } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { coreServices } from "~/services/user/core";
import { ServiceMiddleware } from "~/types";

export const throwIfUserExist: ServiceMiddleware<
	| Cellphone
	| {
			userId?: UserId;
			currentUserId?: UserId;
	  },
	void
> = async (data) => {
	const uid =
		"userId" in data
			? data.userId
			: "currentUserId" in data
			? data.currentUserId
			: undefined;

	const user = await coreServices.find(uid ? { userId: uid } : data);
	if (user) errorStore.find("USER_EXIST");
};
