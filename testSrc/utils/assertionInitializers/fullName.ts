import { FullName } from "utility-store/lib/types";

import { AssertionInitializer } from "@/types";
import { firstNameAssertionInitializer } from "@/utils/assertionInitializers/firstName";
import { lastNameAssertionInitializer } from "@/utils/assertionInitializers/lastName";

export const fullNameAssertionInitializer: AssertionInitializer<FullName> = (
	{ equalValue, testValue },
	options
) => {
	firstNameAssertionInitializer(
		{
			equalValue: equalValue?.firstName,
			testValue: testValue.firstName,
		},
		options
	);

	lastNameAssertionInitializer(
		{
			equalValue: equalValue?.lastName,
			testValue: testValue.lastName,
		},
		options
	);
};
