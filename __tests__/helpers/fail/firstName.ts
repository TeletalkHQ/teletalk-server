import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const userModels = models.native.user;

const firstNameFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.firstName, "firstName")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minlength()
    .maxlength();
};

export { firstNameFailTest };
