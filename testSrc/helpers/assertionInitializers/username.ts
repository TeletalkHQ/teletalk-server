import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const usernameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setVariables(models.native.username, equalValue, testValue)
    .setOptions(options);

  builder.stringEquality().typeCheck().lteCheck();

  if (equalValue) builder.gteCheck();

  builder.run();
};

export { usernameAssertionInitializer };
