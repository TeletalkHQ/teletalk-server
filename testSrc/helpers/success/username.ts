import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const usernameSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  const builder = successTestBuilder
    .create()
    .setVariables(userModels.username, equalValue, testValue)
    .setOptions(options);

  builder.stringEquality().typeCheck().lteCheck();

  if (equalValue) builder.gteCheck();

  builder.run();
};

export { usernameSuccessTest };
