import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const lastNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.lastName, "lastName")
    .missing()
    .overload()
    .invalidType()
    .maxlength()
    .minlength();
};

export { lastNameFailTest };
