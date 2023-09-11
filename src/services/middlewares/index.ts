import { privateChatMiddlewares } from "./privateChat";
import { userMiddlewares } from "./user";

export const serviceMiddlewares = {
	...userMiddlewares,
	...privateChatMiddlewares,
};
