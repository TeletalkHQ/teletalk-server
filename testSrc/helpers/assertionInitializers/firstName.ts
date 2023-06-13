import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "~/models";

import { AssertionInitializer } from "$/types";

const firstNameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.firstName, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .run();
};

export { firstNameAssertionInitializer };
