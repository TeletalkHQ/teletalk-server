import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const bioAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(userModels.bio, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .addCommonTest()
    .run();
};

export { bioAssertionInitializer };
