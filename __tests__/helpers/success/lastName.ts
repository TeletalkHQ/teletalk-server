import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const lastNameSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  const builder = successTestBuilder
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

export { lastNameSuccessTest };
