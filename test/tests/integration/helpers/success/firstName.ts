import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const userModels = models.native.user;

const firstNameSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .addCommonTest()
    .emptyCheck()
    .run();
};

export { firstNameSuccessTest };
