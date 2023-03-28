import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const userModels = models.native.user;

const userIdFailTest: FailTestExecutor = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.userId, "userId")
    .missing()
    .overload()
    .invalidType()
    .empty()
    .minlength()
    .maxlength();
};

export { userIdFailTest };
