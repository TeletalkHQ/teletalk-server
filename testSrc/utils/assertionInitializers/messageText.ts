import { models } from "~/models";
import { MessageText } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

const chatModels = models.native;

export const messageTextAssertionInitializer: AssertionInitializer<
	MessageText
> = ({ equalValue, testValue }, options) => {
	assertionInitializer()
		.setVariables(chatModels.messageText, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.run();
};
