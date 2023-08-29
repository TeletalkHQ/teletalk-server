import { models } from "~/models";
import { SenderId } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

export const senderIdAssertionInitializer: AssertionInitializer<SenderId> = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(chatModels.senderId, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.run();
};
