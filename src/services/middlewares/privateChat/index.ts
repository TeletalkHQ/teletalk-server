import { createPrivateChatIfNotExist } from "./createPrivateChatIfNotExist";
import { findPrivateChat } from "./findPrivateChat";
import { throwIfPrivateChatExist } from "./throwIfPrivateChatExist";

export const privateChatMiddlewares = {
	createPrivateChatIfNotExist,
	findPrivateChat,
	throwIfPrivateChatExist,
};
