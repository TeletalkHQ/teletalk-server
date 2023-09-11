import { ExtendedCellphone } from "utility-store/lib/types";

import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

import { commonMiddlewares } from "../common";

export const findTargetParticipant: ServiceMiddleware<
	{
		targetParticipantId?: UserId;
		targetParticipantCellphone?: ExtendedCellphone;
	},
	{
		targetParticipant: HydratedUser;
	}
> = async (data) => {
	const { user } = await commonMiddlewares.findUser({
		cellphone: data.targetParticipantCellphone,
		errorReason: "TARGET_USER_NOT_EXIST",
		userId: data.targetParticipantId,
	});

	return {
		targetParticipant: user,
	};
};
