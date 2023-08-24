import { AssertionInitializer } from "@/types";
import { firstNameAssertionInitializer } from "@/utils/assertionInitializers/firstName";
import { lastNameAssertionInitializer } from "@/utils/assertionInitializers/lastName";

export const fullNameAssertionInitializer: AssertionInitializer = ({
	equalValue,
	testValue,
}) => {
	firstNameAssertionInitializer({
		equalValue: equalValue.firstName,
		testValue: testValue.firstName,
	});

	lastNameAssertionInitializer({
		equalValue: equalValue.lastName,
		testValue: testValue.lastName,
	});
};
