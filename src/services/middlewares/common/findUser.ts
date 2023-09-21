import { Cellphone, UserId } from "teletalk-type-store";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { ErrorReason, HydratedUser, ServiceMiddleware } from "~/types";

export const findUser: ServiceMiddleware<
	{
		userId?: UserId;
		cellphone?: Cellphone;
		errorReason: ErrorReason;
	},
	{
		user: HydratedUser;
	}
> = async (data) => {
	let user: HydratedUser | null;

	if (data.userId) {
		user = await coreServices.find({
			userId: data.userId,
		});
	} else if (data.cellphone) {
		user = await coreServices.find(extractor.cellphone(data.cellphone));
	}

	if (!user!) throw errorStore.find(data.errorReason);

	return {
		user,
	};
};
