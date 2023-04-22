import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const phoneNumberAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.phoneNumber, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .run();
};

export { phoneNumberAssertionInitializer };
