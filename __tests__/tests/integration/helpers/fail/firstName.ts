import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const firstNameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.firstName, "firstName")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};

export { firstNameFailTest };
