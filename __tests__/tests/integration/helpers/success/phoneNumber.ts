import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const userModels = models.native.user;

const phoneNumberSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.phoneNumber, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .run();
};

export { phoneNumberSuccessTest };
