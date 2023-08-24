import { PrivateChatService } from "~/types";
import { HydratedPrivateChat } from "~/types/models";

import { findPrivateChats } from "./findPrivateChats";

export const findPrivateChatsByParticipantId: PrivateChatService<
	{
		participantId: string;
	},
	HydratedPrivateChat[] | null
> = (data, projection, options) => {
	return findPrivateChats(
		{
			"participants.participantId": data.participantId,
		},
		projection,
		options
	);
};
