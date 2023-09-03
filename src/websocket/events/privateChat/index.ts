import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
	GetChatInfoIO,
	GetPrivateChatIO,
	GetPrivateChatsIO,
	JoinRoomIO,
	SendMessageIO,
} from "~/types";
import { fields } from "~/variables";
import { privateChatHandlers } from "~/websocket/events/privateChat/handlers";

const builder = socketEventBuilder();

const getChatInfo = builder
	.create<GetChatInfoIO>()
	.handler(privateChatHandlers.getChatInfo)
	.name("getChatInfo")
	.inputFields({ chatId: fields.single.chatId })
	.outputFields({
		chatInfo: fields.statics.object({
			chatId: fields.single.chatId,
			createdAt: fields.single.createdAt,
			participants: fields.collection.participants,
		}),
	})
	.build();

const getPrivateChat = builder
	.create<GetPrivateChatIO>()
	.handler(privateChatHandlers.getPrivateChat)
	.name("getPrivateChat")
	.inputFields({ chatId: fields.single.chatId })
	.outputFields({
		privateChat: fields.statics.object(fields.collection.privateChat),
	})
	.build();

const getPrivateChats = builder
	.create<GetPrivateChatsIO>()
	.handler(privateChatHandlers.getPrivateChats)
	.name("getPrivateChats")
	.outputFields({
		privateChats: fields.statics.array(fields.collection.privateChat),
	})
	.build();

const joinRoom = builder
	.create<JoinRoomIO>()
	.name("joinRoom")
	.handler(privateChatHandlers.joinRoom)
	.method("once")
	.build();

const sendMessage = builder
	.create<SendMessageIO>()
	.handler(privateChatHandlers.sendMessage)
	.name("sendMessage")
	.inputFields({
		messageText: fields.single.messageText,
		targetParticipantId: fields.single.participantId,
	})
	.outputFields({
		chatId: fields.single.chatId,
		addedMessage: fields.statics.object(fields.collection.messageItem),
	})
	.build();

export const privateChat = {
	events: [getChatInfo, getPrivateChat, getPrivateChats, joinRoom, sendMessage],
	handlers: privateChatHandlers,
};
