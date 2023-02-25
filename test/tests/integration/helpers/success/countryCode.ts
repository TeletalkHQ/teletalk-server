import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

import { testVariablesManager } from "$/classes/TestVariablesManager";

const countryCodeSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .run();
};

export { countryCodeSuccessTest };
