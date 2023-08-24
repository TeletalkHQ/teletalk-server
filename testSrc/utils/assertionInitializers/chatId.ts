import { models } from "~/models";
import { ChatId } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

export const chatIdAssertionInitializer: AssertionInitializer<ChatId> = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(chatModels.chatId, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.run();
};
