import { successTestBuilder } from "$/classes/SuccessTestBuilder";

import { models } from "@/models";

import { SuccessTestExecutor } from "$/types";

const userModels = models.native.user;

const countryCodeSuccessTest: SuccessTestExecutor = (
  { equalValue, testValue },
  options
) => {
  successTestBuilder
    .create()
    .setVariables(userModels.countryCode, equalValue, testValue)
    .setOptions(options)
    .addCommonTest()
    .emptyCheck()
    .numericCheck()
    .run();
};

export { countryCodeSuccessTest };
