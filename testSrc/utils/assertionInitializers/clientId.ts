import { models } from "~/models";
import { ClientId } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const clientIdAssertionInitializer: AssertionInitializer<ClientId> = (
	{ equalValue, testValue },
	options
) => {
	const builder = assertionInitializer()
		.setVariables(models.native.clientId, equalValue, testValue)
		.setOptions(options);

	builder.typeCheck().gteCheck().lteCheck().stringEquality();

	builder.run();
};
