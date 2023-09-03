import { getChatInfo } from "~/websocket/events/privateChat/handlers/getChatInfo";
import { getPrivateChat } from "~/websocket/events/privateChat/handlers/getPrivateChat";
import { getPrivateChats } from "~/websocket/events/privateChat/handlers/getPrivateChats";
import { joinRoom } from "~/websocket/events/privateChat/handlers/joinRoom";
import { sendMessage } from "~/websocket/events/privateChat/handlers/sendMessage";

export const privateChatHandlers = {
	getChatInfo,
	getPrivateChat,
	getPrivateChats,
	joinRoom,
	sendMessage,
};
