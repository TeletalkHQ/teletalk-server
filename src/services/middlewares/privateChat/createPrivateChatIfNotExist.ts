import { UserId } from "teletalk-type-store";
import { randomMaker } from "utility-store";

import { models } from "~/models";
import { coreServices } from "~/services/privateChat/core";
import { ServiceMiddleware } from "~/types";

export const createPrivateChatIfNotExist: ServiceMiddleware<
	{
		currentParticipantId: UserId;
		targetParticipantId: UserId;
	},
	void
> = async (data) => {
	const p = await coreServices.find({
		"participants.participantId": {
			$all: [data.currentParticipantId, data.targetParticipantId],
		},
	});

	if (!p) {
		await coreServices.create({
			chatId: randomMaker.id(models.native.chatId.maxLength),
			createdAt: Date.now(),
			currentParticipantId: data.currentParticipantId,
			targetParticipantId: data.targetParticipantId,
		});
	}
};
