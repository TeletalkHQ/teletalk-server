import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const userIdAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(userModels.userId, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .addCommonTest()
    .run();
};

export { userIdAssertionInitializer };
