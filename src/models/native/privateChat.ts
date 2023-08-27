import { commonModels } from "~/models/native/common";

export const privateChatModels = {
	chatId: {
		...commonModels.id,
		minLength: 30,
		maxLength: 35,
	},
	createdAt: commonModels.createdAt,
	messageId: {
		...commonModels.id,
		maxLength: 45,
		minLength: 40,
	},
	messageText: {
		empty: false,
		maxLength: 1000,
		minLength: 1,
		required: true,
		trim: true,
		type: "string",
	},
	get participantId() {
		return commonModels.userId;
	},
	senderId: commonModels.userId,
	get targetParticipantId() {
		return this.participantId;
	},
} as const;
