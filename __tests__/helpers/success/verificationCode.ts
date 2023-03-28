import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const verificationCodeSuccessTest: SuccessTestExecutor = (
  { testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.verificationCode, "", testValue)
    .setOptions(options)
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .run();
};

export { verificationCodeSuccessTest };
