import { ExtendedCellphone, UserId } from "teletalk-type-store";

import { HydratedUser, ServiceMiddleware } from "~/types";

import { commonMiddlewares } from "../common";

export const findCurrentParticipant: ServiceMiddleware<
	{
		currentParticipantId?: UserId;
		currentUserCellphone?: ExtendedCellphone;
	},
	{
		currentParticipant: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.currentUserCellphone,
		errorReason: "CURRENT_USER_NOT_EXIST",
		userId: data.currentParticipantId,
	});

	return {
		currentParticipant: user,
	};
};
