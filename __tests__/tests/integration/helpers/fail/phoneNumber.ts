import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const phoneNumberFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.phoneNumber, "phoneNumber")
    .missing()
    .overload()
    .invalidType()
    .empty.numeric()
    .minlength()
    .maxlength();
};

export { phoneNumberFailTest };
