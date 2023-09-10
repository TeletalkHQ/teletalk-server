import { create } from "./create";
import { findByChatId } from "./findByChatId";
import { findManyByParticipantId } from "./findManyByParticipantId";
import { isPrivateChatExist } from "./isPrivateChatExist";
import { sendMessage } from "./sendMessage";

export const chatServices = {
	findByChatId,
	findManyByParticipantId,
	isPrivateChatExist,
	sendMessage,
	create,
};
