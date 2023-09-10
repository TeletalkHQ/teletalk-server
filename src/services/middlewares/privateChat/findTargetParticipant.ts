import { ExtendedCellphone } from "utility-store/lib/types";

import { errorStore } from "~/classes/ErrorStore";
import { extractor } from "~/classes/Extractor";
import { coreServices } from "~/services/user/core";
import { HydratedUser, ServiceMiddleware } from "~/types";
import { UserId } from "~/types/datatypes";

export const findTargetParticipant: ServiceMiddleware<
	{
		targetParticipantId?: UserId;
		targetParticipantCellphone?: ExtendedCellphone;
	},
	{
		targetParticipant: HydratedUser;
	}
> = async (data) => {
	let p: HydratedUser | null;

	if (data.targetParticipantId) {
		p = await coreServices.find({
			userId: data.targetParticipantId,
		});
	} else if (data.targetParticipantCellphone) {
		p = await coreServices.find(
			extractor.cellphone(data.targetParticipantCellphone)
		);
	}

	if (!p!) throw errorStore.find("TARGET_USER_NOT_EXIST");

	return {
		targetParticipant: p,
	};
};
