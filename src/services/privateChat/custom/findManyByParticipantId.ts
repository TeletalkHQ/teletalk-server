import { PrivateChats } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const findManyByParticipantId = serviceBuilder
	.create<
		{
			participantId: string;
		},
		{
			privateChats: PrivateChats;
		}
	>()
	.setBody(async (data, options, projection) => {
		const privateChats = await coreServices.findMany(
			{
				"participants.participantId": data.participantId,
			},
			options,
			projection
		);

		return {
			privateChats,
		};
	})
	.build();
