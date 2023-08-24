import { CountryCode } from "utility-store/lib/types";

import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const countryCodeAssertionInitializer: AssertionInitializer<
	CountryCode
> = ({ equalValue, testValue }, options) => {
	assertionInitializer()
		.setVariables(models.native.countryCode, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.emptyCheck()
		.numericCheck()
		.run();
};
