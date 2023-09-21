import { CreatedAt } from "teletalk-type-store";

import { models } from "~/models";
import { PrivateChatService } from "~/types";
import { HydratedPrivateChat } from "~/types/model";

export const create: PrivateChatService<
	{
		chatId: string;
		createdAt: CreatedAt;
		currentParticipantId: string;
		targetParticipantId: string;
	},
	HydratedPrivateChat
> = (data) => {
	return models.database.PrivateChat.create({
		chatId: data.chatId,
		createdAt: data.createdAt,
		participants: [
			{
				participantId: data.currentParticipantId,
			},
			{
				participantId: data.targetParticipantId,
			},
		],
	});
};
