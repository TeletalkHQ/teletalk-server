import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const userModels = models.native.user;

const verificationCodeSuccessTest = (
  { testValue },
  { modelCheck = true } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.verificationCode, "", testValue)
    .setOptions({ modelCheck })
    .typeCheck()
    .emptyCheck()
    .numericCheck()
    .lengthCheck()
    .run();
};

export { verificationCodeSuccessTest };
