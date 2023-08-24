import { models } from "~/models";
import { Username } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const usernameAssertionInitializer: AssertionInitializer<Username> = (
	{ equalValue, testValue },
	options
) => {
	const builder = assertionInitializer()
		.setVariables(models.native.username, equalValue, testValue)
		.setOptions(options);

	builder.stringEquality().typeCheck().lteCheck();

	if (equalValue) builder.gteCheck();

	builder.run();
};
