import { serviceBuilder } from "~/classes/service/ServiceBuilder";
import { ChatId, UserId } from "~/types/datatypes";

import { coreServices } from "../core";

export const isPrivateChatExist = serviceBuilder
	.create<
		{
			chatId?: ChatId;
			currentParticipantId?: UserId;
			targetParticipantId?: UserId;
		},
		boolean
	>()
	.setBody(async (data) => {
		if (data.chatId) {
			return !!(await coreServices.find({
				chatId: data.chatId,
			}));
		} else if (data.currentParticipantId && data.targetParticipantId) {
			return !!(await coreServices.find({
				["participants.participantId"]: {
					$all: [data.currentParticipantId, data.targetParticipantId],
				},
			}));
		}

		return false;
	})
	.build();
