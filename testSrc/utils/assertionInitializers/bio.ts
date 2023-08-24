import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const bioAssertionInitializer: AssertionInitializer = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(models.native.bio, equalValue, testValue)
		.setOptions(options)
		.emptyCheck()
		.addCommonTest()
		.run();
};
