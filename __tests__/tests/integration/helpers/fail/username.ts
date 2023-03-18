import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const usernameFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.username, "username")
    .missing()
    .overload()
    .invalidType()
    .minlength()
    .maxlength();
};

export { usernameFailTest };
