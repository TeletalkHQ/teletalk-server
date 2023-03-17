import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const userModels = models.native.user;

const bioSuccessTest = (
  { equalValue, testValue },
  {
    stringEquality = true,
    modelCheck = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.bio, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality })
    .emptyCheck()
    .addCommonTest()
    .run();
};

export { bioSuccessTest };
