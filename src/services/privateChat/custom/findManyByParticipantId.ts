import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { PrivateChats } from "~/types/datatypes";

import { coreServices } from "../core";

export const findManyByParticipantId = serviceBuilder
	.create<
		{
			participantId: string;
		},
		PrivateChats
	>()
	.setBody((data, options, projection) => {
		return coreServices.findMany(
			{
				"participants.participantId": data.participantId,
			},
			options,
			projection
		);
	})
	.build();
