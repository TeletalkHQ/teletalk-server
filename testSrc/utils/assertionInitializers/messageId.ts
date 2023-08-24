import { models } from "~/models";
import { MessageId } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

export const messageIdAssertionInitializer: AssertionInitializer<MessageId> = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(chatModels.messageId, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.run();
};
