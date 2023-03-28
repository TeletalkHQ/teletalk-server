import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const firstNameSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.firstName, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .run();
};

export { firstNameSuccessTest };
