import { ExtendedCellphone, SessionId, UserId } from "teletalk-type-store";

import { HydratedUser, ServiceMiddleware } from "~/types";

import { commonMiddlewares } from "../common";

export const findCurrentUser: ServiceMiddleware<
	{
		currentUserId?: UserId;
		currentSessionId?: SessionId;
		currentUserCellphone?: ExtendedCellphone;
	},
	{
		currentUser: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.currentUserCellphone,
		errorReason: "CURRENT_USER_NOT_EXIST",
		sessionId: data.currentSessionId,
		userId: data.currentUserId,
	});

	return {
		currentUser: user,
	};
};
