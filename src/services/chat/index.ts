import { createPrivateChat } from "~/services/chat/createPrivateChat";
import { findOnePrivateChat } from "~/services/chat/findOnePrivateChat";
import { findOnePrivateChatByChatId } from "~/services/chat/findOnePrivateChatByChatId";
import { findPrivateChats } from "~/services/chat/findPrivateChats";
import { findPrivateChatsByParticipantId } from "~/services/chat/findPrivateChatsByParticipantId";
import { sendPrivateMessage } from "~/services/chat/sendPrivateMessage";

export const chatServices = {
	createPrivateChat,
	findOnePrivateChat,
	findOnePrivateChatByChatId,
	findPrivateChats,
	findPrivateChatsByParticipantId,
	sendPrivateMessage,
};
