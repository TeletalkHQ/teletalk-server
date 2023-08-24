import { CountryName } from "utility-store/lib/types";

import { models } from "~/models";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const countryNameAssertionInitializer: AssertionInitializer<
	CountryName
> = ({ equalValue, testValue }, options) => {
	assertionInitializer()
		.setVariables(models.native.countryName, equalValue, testValue)
		.setOptions(options)
		.addCommonTest()
		.emptyCheck()
		.run();
};
