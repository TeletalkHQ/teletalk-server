import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const userModels = models.native.user;

const lastNameFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.lastName, "lastName")
    .missing();
  // .overload()
  // .invalidType()
  // .maxlength()
  // .minlength();
};

export { lastNameFailTest };
