import { ExtendedCellphone } from "utility-store/lib/types";

import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

import { commonMiddlewares } from "../common";

export const findCurrentUser: ServiceMiddleware<
	{
		currentUserId?: UserId;
		currentUserCellphone?: ExtendedCellphone;
	},
	{
		currentUser: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.currentUserCellphone,
		errorReason: "CURRENT_USER_NOT_EXIST",
		userId: data.currentUserId,
	});

	return {
		currentUser: user,
	};
};
