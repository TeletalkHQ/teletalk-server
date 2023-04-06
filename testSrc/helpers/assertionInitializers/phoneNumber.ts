import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const phoneNumberAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(userModels.phoneNumber, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .run();
};

export { phoneNumberAssertionInitializer };
