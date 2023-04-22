import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const verificationCodeAssertionInitializer: AssertionInitializer = (
  { testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(models.native.verificationCode, "", testValue)
    .setOptions(options)
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .run();
};

export { verificationCodeAssertionInitializer };
