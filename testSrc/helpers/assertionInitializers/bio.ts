import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "~/models";

import { AssertionInitializer } from "$/types";

const bioAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.bio, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .addCommonTest()
    .run();
};

export { bioAssertionInitializer };
