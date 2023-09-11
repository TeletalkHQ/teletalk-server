import { nativeModelBuilder } from "~/classes/NativeModelBuilder";
import {
	ChatId,
	MessageId,
	MessageText,
	Messages,
	Participants,
	PrivateChats,
} from "~/types";

import { commonModels } from "./common";

export const privateChatModels = {
	chatId: nativeModelBuilder
		.create<ChatId>()
		.type("string")
		.required(true)
		.empty(false)
		.minLength(30)
		.maxLength(35)
		.trim(true)
		.unique(true)
		.build(),
	createdAt: commonModels.createdAt,
	messageId: nativeModelBuilder
		.create<MessageId>()
		.type("string")
		.required(true)
		.empty(false)
		.maxLength(45)
		.minLength(40)
		.trim(true)
		.unique(true)
		.build(),
	messages: nativeModelBuilder
		.create<Messages>()
		.type("array")
		.required(true)
		.empty(true)
		.build(),
	messageText: nativeModelBuilder
		.create<MessageText>()
		.type("string")
		.required(true)
		.empty(false)
		.minLength(1)
		.maxLength(1000)
		.trim(true)
		.build(),
	participantId: commonModels.id,
	participants: nativeModelBuilder
		.create<Participants>()
		.type("array")
		.required(true)
		.length(2)
		.empty(false)
		.build(),
	privateChats: nativeModelBuilder
		.create<PrivateChats>()
		.type("array")
		.required(true)
		.build(),
	senderId: commonModels.id,
	get targetParticipantId() {
		return this.participantId;
	},
};
