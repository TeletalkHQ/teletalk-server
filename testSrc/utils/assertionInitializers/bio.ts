import { models } from "~/models";
import { Bio } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const bioAssertionInitializer: AssertionInitializer<Bio> = (
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
