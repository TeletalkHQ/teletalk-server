import { ExtendedCellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findCurrentParticipant: ServiceMiddleware<
	{
		currentParticipantId?: UserId;
		currentUserCellphone?: ExtendedCellphone;
	},
	{
		currentParticipant: HydratedUser;
	}
> = async (data) => {
	let p: HydratedUser | null;

	if (data.currentParticipantId) {
		p = await coreServices.find({
			userId: data.currentParticipantId,
		});
	} else if (data.currentUserCellphone) {
		p = await coreServices.find(extractor.cellphone(data.currentUserCellphone));
	}

	if (!p!) throw errorStore.find("CURRENT_USER_NOT_EXIST");

	return {
		currentParticipant: p,
	};
};
