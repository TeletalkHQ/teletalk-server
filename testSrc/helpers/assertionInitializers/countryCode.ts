import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const countryCodeAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(userModels.countryCode, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .run();
};

export { countryCodeAssertionInitializer };
