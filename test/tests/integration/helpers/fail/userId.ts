import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const userIdFailTest = (configuredRequester, data = {}) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.userId, "userId")
    .missing()
    .overload()
    .invalidType()
    .empty.minlength()
    .maxlength();
};

export { userIdFailTest };
