import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const phoneNumberSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.phoneNumber, equalValue, testValue)
    .setOptions(options)
    .emptyCheck()
    .numericCheck()
    .addCommonTest()
    .run();
};

export { phoneNumberSuccessTest };
