import { models } from "~/models";
import { PhoneNumber } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const phoneNumberAssertionInitializer: AssertionInitializer<
	PhoneNumber
> = ({ equalValue, testValue }, options) => {
	assertionInitializer()
		.setVariables(models.native.phoneNumber, equalValue, testValue)
		.setOptions(options)
		.emptyCheck()
		.numericCheck()
		.addCommonTest()
		.run();
};
