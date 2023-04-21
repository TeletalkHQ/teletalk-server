import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const lastNameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setVariables(models.native.lastName, equalValue, testValue)
    .setOptions(options);

  builder
    .stringEquality()
    .typeCheck()
    .emptyCheck()
    .addIf(models.native.lastName.empty.value === false, () =>
      builder.lteCheck()
    )
    .run();
};

export { lastNameAssertionInitializer };
