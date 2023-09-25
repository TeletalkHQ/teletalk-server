import { ExtendedCellphone, SessionId, UserId } from "teletalk-type-store";

import { HydratedUser, ServiceMiddleware } from "~/types";

import { commonMiddlewares } from "../common";

export const findCurrentParticipant: ServiceMiddleware<
	{
		currentParticipantId?: UserId;
		currentUserCellphone?: ExtendedCellphone;
		currentSessionId?: SessionId;
	},
	{
		currentParticipant: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.currentUserCellphone,
		errorReason: "CURRENT_USER_NOT_EXIST",
		sessionId: data.currentSessionId,
		userId: data.currentParticipantId,
	});

	return {
		currentParticipant: user,
	};
};
