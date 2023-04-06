import { assertionInitializer } from "$/classes/AssertionInitializer";

import { models } from "@/models";

import { AssertionInitializer } from "$/types";

const userModels = models.native.user;

const verificationCodeAssertionInitializer: AssertionInitializer = (
  { testValue },
  options
) => {
  assertionInitializer
    .create()
    .setVariables(userModels.verificationCode, "", testValue)
    .setOptions(options)
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .run();
};

export { verificationCodeAssertionInitializer };
