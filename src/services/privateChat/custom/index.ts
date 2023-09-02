import { findByChatId } from "./findByChatId";
import { findManyByParticipantId } from "./findManyByParticipantId";
import { sendMessage } from "./sendMessage";

export const chatServices = {
	findByChatId,
	findManyByParticipantId,
	sendMessage,
};
