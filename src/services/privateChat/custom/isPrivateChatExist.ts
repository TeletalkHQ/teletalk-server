import { ChatId, UserId } from "teletalk-type-store";

import { serviceBuilder } from "~/classes/service/ServiceBuilder";

import { coreServices } from "../core";

export const isPrivateChatExist = serviceBuilder
	.create<
		{
			chatId?: ChatId;
			currentParticipantId?: UserId;
			targetParticipantId?: UserId;
		},
		{
			isPrivateChatExist: boolean;
		}
	>()
	.setBody(async (data) => {
		if (data.chatId) {
			return {
				isPrivateChatExist: !!(await coreServices.find({
					chatId: data.chatId,
				})),
			};
		} else if (data.currentParticipantId && data.targetParticipantId) {
			return {
				isPrivateChatExist: !!(await coreServices.find({
					["participants.participantId"]: {
						$all: [data.currentParticipantId, data.targetParticipantId],
					},
				})),
			};
		}

		return {
			isPrivateChatExist: false,
		};
	})
	.build();
