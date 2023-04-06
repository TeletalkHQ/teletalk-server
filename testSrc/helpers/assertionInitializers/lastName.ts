import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const lastNameAssertionInitializer: AssertionInitializer = (
  { equalValue, testValue },
  options
) => {
  const builder = assertionInitializer
    .create()
    .setVariables(userModels.lastName, equalValue, testValue)
    .setOptions(options);

  builder
    .stringEquality()
    .typeCheck()
    .emptyCheck()
    .addIf(userModels.lastName.empty.value === false, () => builder.lteCheck())
    .run();
};

export { lastNameAssertionInitializer };
