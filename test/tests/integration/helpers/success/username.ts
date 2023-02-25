import { successTestBuilder } from "$/classes/SuccessTestBuilder";
import { testVariablesManager } from "$/classes/TestVariablesManager";

import { models } from "@/models";

const userModels = models.native.user;

const usernameSuccessTest = (
  { equalValue, testValue },
  {
    modelCheck = true,
    stringEquality = true,
  } = testVariablesManager.successTestDefaultOptions
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.username, equalValue, testValue)
    .setOptions({ modelCheck, stringEquality });

  builder.stringEquality().typeCheck().lteCheck();

  if (equalValue) builder.gteCheck();

  builder.run();
};

export { usernameSuccessTest };
