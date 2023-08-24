import { models } from "~/models";
import { UserId } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const userIdAssertionInitializer: AssertionInitializer<UserId> = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(models.native.userId, equalValue, testValue)
		.setOptions(options)
		.emptyCheck()
		.addCommonTest()
		.run();
};
