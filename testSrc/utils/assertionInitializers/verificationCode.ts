import { models } from "~/models";
import { VerificationCode } from "~/types/datatypes";

import { assertionInitializer } from "@/classes/AssertionInitializer";
import { AssertionInitializer } from "@/types";

export const verificationCodeAssertionInitializer: AssertionInitializer<
	VerificationCode
> = ({ testValue }, options) => {
	assertionInitializer()
		.setVariables(models.native.verificationCode, "", testValue)
		.setOptions(options)
		.typeCheck()
		.emptyCheck()
		.numericCheck()
		.lengthCheck()
		.run();
};
