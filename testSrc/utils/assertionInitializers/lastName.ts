import { models } from "~/models";
import { LastName } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const lastNameAssertionInitializer: AssertionInitializer<LastName> = (
	{ equalValue, testValue },
	options
) => {
	const builder = assertionInitializer()
		.setVariables(models.native.lastName, equalValue, testValue)
		.setOptions(options);

	builder
		.stringEquality()
		.typeCheck()
		.emptyCheck()
		.addIf(models.native.lastName.empty, () => builder.lteCheck())
		.run();
};
