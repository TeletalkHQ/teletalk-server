import { models } from "~/models";
import { FirstName } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const firstNameAssertionInitializer: AssertionInitializer<FirstName> = (
	{ equalValue, testValue },
	options
) => {
	assertionInitializer()
		.setVariables(models.native.firstName, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.emptyCheck()
		.run();
};
