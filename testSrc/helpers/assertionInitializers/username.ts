import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const usernameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setVariables(userModels.username, equalValue, testValue)
    .setOptions(options);

  builder.stringEquality().typeCheck().lteCheck();

  if (equalValue) builder.gteCheck();

  builder.run();
};

export { usernameAssertionInitializer };
