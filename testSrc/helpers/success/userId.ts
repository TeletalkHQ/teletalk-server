import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const userIdSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.userId, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .addCommonTest()
    .run();
};

export { userIdSuccessTest };
